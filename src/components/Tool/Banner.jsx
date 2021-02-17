/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import BannerSVGAnim from './component/BannerSVGAnim';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { NEWS } from '../../const';
import { Divider } from 'antd';

const Banner = (props) => {
  const [news, setNews] = useState([]);
  const handleSubmit = (e) => {
    if (props.callback) props.callback(e);
  };
  const fetchData = async () => {
    props.setLoading(true);
    fetch(NEWS)
      .then((res) => {
        props.setLoading(false);
        return res.json();
      })
      .then(
        (result) => {
          let arr = [];
          result.forEach((e) => {
            arr.push({
              title: e.title,
              url: e.buttons[0].url,
              thumbnail: e.image_url,
            });
          });
          setNews(arr);
          props.setLoading(false);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 770 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 770, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <>
      <div className='banner-wrapper container'>
        <QueueAnim
          className='banner-title-wrapper'
          type={props.isMobile ? 'bottom' : 'right'}
        >
          <div key='line' className='title-line-wrapper'>
            <div
              className='title-line'
              style={{ transform: 'translateX(-64px)' }}
            />
          </div>
          <h1 key='h1'>Select UETNews Here!</h1>
          <p key='content'>From #NoCtrlZ with love 🥰</p>
        </QueueAnim>
        {!props.isMobile && (
          <TweenOne
            animation={{ opacity: 1 }}
            className='banner-image-wrapper ml-auto'
          >
            <BannerSVGAnim />
          </TweenOne>
        )}
      </div>
      <div className='container'>
        <Carousel responsive={responsive}>
          {news.map((_news) => (
            <div
              className='news-item'
              title={_news.title}
              onClick={() => {
                handleSubmit(_news);
              }}
            >
              <div
                className='thumbnail'
                style={{ background: `url(${_news.thumbnail})` }}
              ></div>
              <Divider />
              <div className='label'>{_news.title}</div>
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
};

Banner.propTypes = {
  isMobile: PropTypes.bool.isRequired,
};

export default Banner;
