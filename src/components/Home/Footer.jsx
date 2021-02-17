import React from 'react';
import { Row, Col, Button } from 'antd';

function Footer(props) {
  return (
    <footer id='footer' className='dark'>
      <Row className='bottom-bar'>
        <Col lg={6} sm={12}>
          <div className='translate-button'>
            <a href='https://github.com/NoCtrlZ1110'>
              <Button ghost size='small'>
                NoCtrlZ
              </Button>
            </a>
          </div>
        </Col>
        {props.isMobile && (
          <Col lg={6} sm={12}>
            <div className='translate-button'>
              <a
                href='https://www.facebook.com/SupportGroupUET/'
                rel='noopener noreferrer'
                target='_blank'
              >
                SUPPORT GROUP UET
              </a>
            </div>
          </Col>
        )}
        {!props.isMobile && (
          <Col lg={18} sm={24}>
            <span
              style={{
                lineHeight: '16px',
                paddingRight: 12,
                marginRight: 11,
                borderRight: '1px solid rgba(255, 255, 255, 0.55)',
              }}
            >
              <a
                href='https://www.facebook.com/SupportGroupUET/'
                rel='noopener noreferrer'
                target='_blank'
              >
                SUPPORT GROUP UET
              </a>
            </span>
            <span style={{ marginRight: 24 }}>
              <a
                href='https://www.facebook.com/NoCtrlZ'
                rel='noopener noreferrer'
                target='_blank'
              >
                Nguyễn Văn Huy
              </a>
            </span>
            <span style={{ marginRight: 12 }}>Copyright © NoCtrlZ</span>
          </Col>
        )}
      </Row>
    </footer>
  );
}

export default Footer;
