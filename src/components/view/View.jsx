import './View.css';
import React, { useEffect, useState } from 'react';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Style1 from '../template/Style1';
import { Button } from 'antd';
import { COLORS } from '../../const';
import Header from '../Home/Header';
import { enquireScreen } from 'enquire-js';
import {
  faDownload,
  faAlignLeft,
  faExchangeAlt,
  faChevronCircleLeft,
} from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'antd';
import { Col, Row } from 'react-bootstrap';
import { Spin } from 'antd';
/* eslint-disable jsx-a11y/accessible-emoji */

const View = () => {
  const [text] = useState(localStorage.getItem('title'));
  const [index, setIndex] = useState(0);
  const [modalHelp, setModalHelp] = useState(false);
  const [color, setColor] = useState(COLORS[index]);
  const [screenshot, setScreenShot] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [isMobile, setMobile] = useState(false);

  useEffect(() => {
    enquireScreen((b) => {
      setMobile(!!b);
    });
    if (localStorage.getItem('capture')) {
      convertScrnsht(localStorage.getItem('capture'));
    }
    // setTimeout(() => takeThumbnail(), 1000);
  }, []);

  useEffect(() => {
    setTimeout(() => takeThumbnail(), 1000);
  }, [isMobile, screenshot]);

  useEffect(() => {
    setColor(COLORS[index]);
  }, [index]);

  useEffect(() => {
    takeThumbnail();
  }, [color]);

  const closeModal = () => {
    setModalHelp(false);
  };

  const takeThumbnail = () => {
    html2canvas(document.getElementById('NoCtrlZ'), {
      allowTaint: true,
      scrollX: -window.scrollX,
      scrollY: -window.scrollY,
    }).then((canvas) => {
      canvas.toBlob((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        setThumbnail(link);
      });
    });
  };

  const convertScrnsht = (url) => {
    fetch(url, {
      method: 'GET',
      headers: {},
    })
      .then((response) => {
        response.arrayBuffer().then(function (buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement('a');
          link.href = url;
          setScreenShot(link);
          // takeThumbnail();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let downloadHandler = (event) => {
    event.preventDefault();
    html2canvas(document.getElementById('NoCtrlZ'), {
      allowTaint: true,
      scale: 2,
      scrollX: -window.scrollX,
      scrollY: -window.scrollY,
    }).then((canvas) => {
      canvas.toBlob((blob) => {
        saveAs(blob, 'UETNews.png');
      });
    });
  };

  let changeColor = () => {
    if (index < COLORS.length - 1) {
      setIndex(index + 1);
    } else setIndex(0);
    setColor(COLORS[index]);
  };

  let controlPanel = () => {
    return (
      <div className='flex-fill align-self-center'>
        <div className='middle' id='rectangle'>
          <Button
            type='primary'
            className='btn'
            onClick={downloadHandler.bind(this)}
          >
            <FontAwesomeIcon id='icon' icon={faDownload} />
            Download
          </Button>

          <Button type='primary' className='btn mt-3' onClick={changeColor}>
            Color
            <FontAwesomeIcon id='icon' icon={faExchangeAlt} />
          </Button>
          <Button
            type='primary'
            className='btn mt-3'
            onClick={() => {
              setModalHelp(true);
            }}
          >
            Help
            <FontAwesomeIcon id='icon' icon={faAlignLeft} />
          </Button>
          <Button
            type='primary'
            className='btn mt-3'
            onClick={() => (window.location.href = '/#/tool')}
          >
            Go Back
            <FontAwesomeIcon id='icon' icon={faChevronCircleLeft} />
          </Button>
        </div>
      </div>
    );
  };

  return (
    <>
      <Header />
      {!isMobile ? (
        <div className='d-flex'>
          {/* for desktop */}
          <div className='flex-fill'>
            <div className='middle mt-5'>
              <div id='NoCtrlZ'>
                <Style1
                  text={text ? text.toUpperCase() : 'Text will goes here 😎'}
                  screenshot={screenshot}
                  color={color}
                />
              </div>
            </div>
          </div>
          {controlPanel()}
        </div>
      ) : (
        <>
          {/* for mobile */}
          <div className='middle'>{controlPanel()}</div>
          <div
            className='d-flex'
            style={{ position: 'absolute', opacity: 0, left: -700 }}
          >
            <div className='flex-fill'>
              <div className='middle mt-5'>
                <div id='NoCtrlZ'>
                  <Style1
                    text={text ? text.toUpperCase() : 'Text will goes here 😎'}
                    screenshot={screenshot}
                    color={color}
                  />
                </div>
              </div>
            </div>
          </div>
          <Spin spinning={!screenshot} tip='Loading image...'>
            <div className='middle'>
              {thumbnail ? (
                <img
                  className='mt-5'
                  src={thumbnail}
                  width='75%'
                  id='shadow'
                  alt='😎😎😎'
                ></img>
              ) : (
                <div style={{ height: 200 }} />
              )}
            </div>
          </Spin>
        </>
      )}

      <Modal
        title={<div className='text-center'>How to use? </div>}
        centered
        visible={modalHelp}
        onOk={() => closeModal()}
        onCancel={() => closeModal()}
        footer={[
          <Button key='submit' type='dashed' onClick={() => closeModal()}>
            I got it! 🥰🥰🥰
          </Button>,
        ]}
      >
        <Row>
          <Col>
            <b className='mb-3'>❤ For Desktop ❤</b>
            <p />
            <p>- Tap on text to edit content directly</p>
            <p>- Change color by pressing "Color" button</p>
            <p>- Download image & upload to fanpage </p>
            <p />
          </Col>
          <Col>
            <b className='mb-3'>❤ For Mobile ❤</b>
            <p />
            <p>- Can change color</p>
            <p>- Can't edit content directly</p>
            <p>- Download image & upload to fanpage </p>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default View;
