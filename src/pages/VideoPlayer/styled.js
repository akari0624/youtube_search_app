import styled from "styled-components";

export const VideoPlayer = styled.article`
  height: 85vh;
  width: 100vw;
  @media (max-width: 540px) {
    height: 70vh;
  }
`;

export const VideoPlayerPageVideoInfoWrapper = styled.div`
  .title {
    font-size: 1.5rem;
    margin-bottom: 0.3rem;
  }

  .description {
    margin-bottom: 0.3rem;
  }

  .duration {
  }
`;
