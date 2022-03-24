import styled from "styled-components";
import { useScript } from "../hooks/useScript";
import { useEffect, useRef } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import kakaoLogo from "../assets/kakao.png";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";

function ShareModal({ setIsShareModal }) {
  const shareRef = useRef(null);
  const currentUrl = window.location.href;
  const status = useScript("https://developers.kakao.com/sdk/js/kakao.js");
  const handleKakaoButton = () => {
    window.Kakao.Link.sendScrap({
      requestUrl: currentUrl,
    });
  };
  const closeModal = (e) => {
    if (e.target === shareRef.current) {
      setIsShareModal(false);
    }
  };
  useEffect(() => {
    if (status === "ready" && window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init("fb48f24a6a8c2f164e87c39475126cb7");
      }
    }
  }, [status]);
  return (
    <Background ref={shareRef} onClick={closeModal}>
      <Share>
        <H1>공유하기</H1>
        <GridContainer>
          <FacebookShareButton url={currentUrl}>
            <FacebookIcon size={48} round={true} borderRadius={24} />
          </FacebookShareButton>
          <TwitterShareButton url={currentUrl}>
            <TwitterIcon size={48} round={true} borderRadius={24} />
          </TwitterShareButton>
          <CopyToClipboard text={currentUrl}>
            <URLShareButton>URL</URLShareButton>
          </CopyToClipboard>
          <KakaoShareButton onClick={handleKakaoButton}>
            <KakaoIcon src={kakaoLogo} />
          </KakaoShareButton>
        </GridContainer>
      </Share>
    </Background>
  );
}

export default ShareModal;
const Background = styled.div`
  ${({ theme }) => theme.common.flexColumn}
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: 0 auto;
  background: rgba(0, 0, 0, 0.4);
  z-index: 20;
`;
const Share = styled.div`
  ${({ theme }) => theme.common.flexColumn}
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 3px 20px rgba(0, 0, 0, 0.8);
  max-width: 420px;
  width: 100%;
  padding: 1rem 0;
  border-radius: 2rem;
`;
const H1 = styled.h1`
  font-weight: 800;
  font-size: 2rem;
  line-height: 5rem;
  margin-bottom: 1rem;
`;
const GridContainer = styled.div`
  ${({ theme }) => theme.common.flexRow}
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
`;

const URLShareButton = styled.button`
  width: 48px;
  height: 48px;
  color: white;
  border-radius: 50%;
  border: 0px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  background-color: #7362ff;
`;
const KakaoShareButton = styled.a`
  cursor: pointer;
`;
const KakaoIcon = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 24px;
`;
