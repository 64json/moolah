import React, { useContext, useState } from 'react';
import classes from './CarouselPage.module.scss';
import { UIContext } from '../../contexts/UIContext';
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import carousel_0 from '../../assets/carousel_0.png';
import carousel_1 from '../../assets/carousel_1.png';
import carousel_2 from '../../assets/carousel_2.png';
import carousel_3 from '../../assets/carousel_3.png';
import { c } from '../../utils';
import { Button } from '../../components/Button';
import { PageIndex } from '../../enums/PageIndex';

const carouselItems = [{
  image: carousel_0,
  title: 'Wallet',
  description: 'Your own debit card with easy transactions!',
}, {
  image: carousel_1,
  title: 'Stats',
  description: 'Analyze your earning, spending, and goals.',
}, {
  image: carousel_2,
  title: 'Learning',
  description: 'Learn how to manage your money like a pro!',
}, {
  image: carousel_3,
  title: 'Profile',
  description: 'Manage your goals and earn badges for various achievements!',
}];

export function CarouselPage() {
  const { setPageIndex } = useContext(UIContext);

  const [value, setValue] = useState(0);

  return (
    <div className={classes.CarouselPage}>
      <Carousel value={value} onChange={setValue} className={classes.carousel}>
        {
          carouselItems.map((item, i) => (
            <div key={i} className={classes.item}>
              <img src={item.image} className={classes.image} />
              <div className={classes.title}>
                {item.title}
              </div>
              <div className={classes.description}>
                {item.description}
              </div>
            </div>
          ))
        }
      </Carousel>
      <div className={c(classes.dots, value === carouselItems.length - 1 && classes.end)}>
        {
          carouselItems.map((item, i) => (
            <div key={i} className={c(classes.dot, value === i && classes.active)} />
          ))
        }
        <Button primary className={classes.button} onClick={() => setPageIndex(PageIndex.Main)}>
          Get Started
        </Button>
      </div>
    </div>
  );
}
