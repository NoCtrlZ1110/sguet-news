import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DocumentTitle from 'react-document-title';
import { enquireScreen } from 'enquire-js';
import PageHeader from '../Home/Header';
import Banner from './Banner';
import Page1 from './Page1';
import PageFooter from '../Home/Footer';
import ModalContainer from './Modal';
import SquareLoader from 'react-spinners/PacmanLoader';
import LoadingOverlay from 'react-loading-overlay';
import { css } from '@emotion/core';
import { API } from '../../const';
import { Card, Input, Layout } from 'antd';
import './style.less';

const { Sider, Content } = Layout;

export const Tool = () => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(true);
  const [title, setTitle] = useState(null);
  const [capture, setCapture] = useState(null);
  const [status, setStatus] = useState(null);
  const [isMobile, setMobile] = useState(false);

  useEffect(() => {
    enquireScreen((b) => {
      setMobile(!!b);
    });
  }, []);

  const callback = (news) => {
    setLoading(true);
    setSuccess(true);
    fetchData(news);
  };

  const fetchData = (news) => {
    setStatus('Fetching Data ...');
    setTitle(news.title);
    getScrnsht(news.url);
  };

  const getScrnsht = (link) => {
    setStatus('Taking Screenshot ...');
    axios
      .post(API, { url: link })
      .then((res) => {
        setVisible(true);
        setLoading(false);
        setCapture(res.data.image);
      })
      .catch((err) => {
        setSuccess(false);
        setLoading(false);
        setVisible(true);
        console.log('Lỗiii:' + err);
      });
  };

  return (
    <>
      {loading && (
        <LoadingOverlay
          className='overlay'
          active={loading}
          spinner={
            <div>
              <SquareLoader
                css={css`
                  display: block;
                  margin-bottom: 50px;
                `}
                color={'#ffffff'}
                loading={loading}
              />
              {status ? status : 'Just count to 10 ...'}
            </div>
          }
        />
      )}
      <DocumentTitle title='UETNews Generator'>
        <div>
          <PageHeader isMobile={isMobile} />
          <div className='home-wrapper'>
            <Banner
              isMobile={isMobile}
              callback={callback}
              setLoading={setLoading}
            />
          </div>
          <Page1 isMobile={isMobile} />

          <PageFooter isMobile={isMobile} />
        </div>
      </DocumentTitle>
      <ModalContainer
        visible={visible}
        setVisible={setVisible}
        title={success ? 'Data fetched successfully!' : 'Data fetched failed!'}
        success={success}
        callback={(setLoading) => {
          setLoading(true);
          localStorage.setItem('title', title);
          localStorage.setItem('capture', capture);
          setTimeout(() => {
            setLoading(false);
            setVisible(false);
            window.location.href = '/#/view/';
          }, 1000);
        }}
        style={{ width: 'fit-content' }}
      >
        {success ? (
          <div>
            <Layout style={{ alignSelf: 'center' }}>
              <Sider theme='light'>
                <img
                  className='mr-4'
                  src='https://media1.tenor.com/images/1b0948cd2ae915af0293e4641c441b09/tenor.gif'
                  width='75%'
                  alt='thành cmn công :>'
                />
              </Sider>
              <Content style={{ alignSelf: 'center' }}>
                {capture ? (
                  <img src={capture} alt='capture' height='300px'></img>
                ) : null}
              </Content>
            </Layout>
            <Card className='mt-4'>
              <b>Title to render (you can change it)</b>
              <Input
                className='mt-3'
                name='Title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Card>
          </div>
        ) : (
          <>
            <h4>Failed, try again!</h4>
            <img
              className='mr-4'
              src='https://media1.tenor.com/images/9467bbf064b80e9065cdf10b26cbae5b/tenor.gif'
              width='75%'
              alt='sao lại fail nhở, khó hiểu vch :(('
            />
          </>
        )}
      </ModalContainer>
    </>
  );
};

export default Tool;
