import { css, keyframes } from "@emotion/react";
import { Box } from "@chakra-ui/react";

const preloader = keyframes`
  100% {
    transform: scale(1.5);
  }
`;

const dotStyles = css`
  border-radius: 100%;
  border: 5px solid #333;
  margin: 10px;
`;

const loaderBoxStyles = css`
  background: #fff;
  overflow: hidden;
  width: 500px;
  height: 30px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-content: center;

  .dot:nth-of-type(1) {
    animation: ${preloader} 1s ease-in-out infinite;
  }

  .dot:nth-of-type(2) {
    animation: ${preloader} 0.9s ease-in-out infinite;
  }

  .dot:nth-of-type(3) {
    animation: ${preloader} 0.8s ease-in-out infinite;
  }
`;

const Loader = () => {
    return (
        <Box className="loader-box" css={loaderBoxStyles}>
            <Box className="dot" css={dotStyles}></Box>
            <Box className="dot" css={dotStyles}></Box>
            <Box className="dot" css={dotStyles}></Box>
        </Box>
    );
};

export default Loader;