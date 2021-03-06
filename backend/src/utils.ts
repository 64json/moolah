import { SetMetadata } from '@nestjs/common';
import * as https from 'https';
import * as crypto from 'crypto';
import { HttpException } from '@nestjs/common/exceptions/http.exception';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const CLIENT_URL = process.env.NODE_ENV === 'production' ? 'https://jasonpark.me/moolah' : 'http://localhost:3000';

const accessKey = process.env.RAPYD_ACCESS_KEY;
const secretKey = process.env.RAPYD_SECRET_KEY;

export async function makeRequest(method, urlPath, body = null) {
  const httpBaseURL = 'sandboxapi.rapyd.net';
  const salt = generateRandomString(8);
  const idempotency = new Date().getTime().toString();
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = sign(method, urlPath, salt, timestamp, body);

  const options = {
    hostname: httpBaseURL,
    port: 443,
    path: urlPath,
    method,
    headers: {
      'Content-Type': 'application/json',
      salt: salt,
      timestamp: timestamp,
      signature: signature,
      access_key: accessKey,
      idempotency: idempotency,
    },
  };

  return await httpRequest(options, body);
}

function sign(method, urlPath, salt, timestamp, body) {
  let bodyString = '';
  if (body) {
    bodyString = JSON.stringify(body);
    bodyString = bodyString == '{}' ? '' : bodyString;
  }

  const toSign = method.toLowerCase() + urlPath + salt + timestamp + accessKey + secretKey + bodyString;
  const hash = crypto.createHmac('sha256', secretKey);
  hash.update(toSign);
  return Buffer.from(hash.digest('hex')).toString('base64');
}

function generateRandomString(size) {
  return crypto.randomBytes(size).toString('hex');
}

async function httpRequest(options, body): Promise<any> {
  return new Promise((resolve, reject) => {
    try {
      let bodyString = '';
      if (body) {
        bodyString = JSON.stringify(body);
        bodyString = bodyString === '{}' ? '' : bodyString;
      }
      const req = https.request(options, (res) => {
        let response = {
          statusCode: res.statusCode,
          headers: res.headers,
          body: '',
        };
        res.on('data', (data) => {
          response.body += data;
        });
        res.on('end', () => {
          const body = response.body ? JSON.parse(response.body) : {};
          response.body = body;
          if (response.statusCode !== 200) {
            const status = response.statusCode ?? 500;
            const message = body?.status?.error_code ?? 'Unknown error.';
            return reject(new HttpException(message, status));
          }
          return resolve(response);
        });
      });
      req.on('error', (error) => {
        return reject(error);
      });
      req.write(bodyString);
      req.end();
    } catch (err) {
      return reject(err);
    }
  });
}

export function reformatDate(dbDate: string, dayFirst = false) {
  const [yyyy, mm, dd] = dbDate.split('-');
  if (dayFirst) return `${dd}/${mm}/${yyyy}`;
  return `${mm}/${dd}/${yyyy}`;
}

export function formatCurrency(amount: number, currency: string, sign = true) {
  const formatter = new Intl.NumberFormat({
    ILS: 'he',
    MXN: 'es-mx',
    EUR: 'nl',
    SGD: 'zh-sg',
    GBP: 'en-gb',
    USD: 'en-us',
  }[currency], {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  if (sign) {
    const negative = -Math.abs(amount);
    const negativeFormatted = formatter.format(negative);
    if (amount < 0) return negativeFormatted;
    return negativeFormatted.replace('-', '+');
  }
  return formatter.format(amount);
}
