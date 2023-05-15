import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import '../Css/UpImgForm.css';

const FormBox = styled.form`
  width: 100%;
  height: calc(100% - 50px);
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageBox = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Image = styled.div`
  width: 50%;
  height: 50%;
  object-fit: contain;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const UploadPrompt = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 50%;
  height: 50%;
  h2 {
    margin-top : 20px;
    font-size : 1rem;
  }
`;

const MainContents = styled.div`
  p {
    font-size : 25px;
  }
  width: 50%;
  height: 100%;
  .ContentsBox {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
  }
`;

const InTitle = styled.div`
  input {
    width: 85%;
    height: 50px;
    border: none;
    padding: 15px;
    font-size: 16px;
    background: rgba(255, 255, 255, 0.2);
    outline : none;
    border-radius: 14px;
    box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
    border : none;
    border-right : 1px solid rgba(255, 255, 255, 0.2);
    border-bottom : 1px solid rgba(255, 255, 255, 0.2);
    letter-spacing: 1px;
    color : #333;
  }
`;

const InKeyword = styled.div`
  margin-top : 3%;
  input {
    width: 85%;
    height: 50px;
    padding: 15px;
    font-size: 16px;
    background: rgba(255, 255, 255, 0.2);
    outline : none;
    border-radius: 14px;
    box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
    border : none;
    border-right : 1px solid rgba(255, 255, 255, 0.2);
    border-bottom : 1px solid rgba(255, 255, 255, 0.2);
    letter-spacing: 1px;
    color : #333;
  }
`;

const InContents = styled.div`
  margin-top : 3%;
  input {
    width: 85%;
    height: calc(100%-100px);
    padding-top: 10px;
    padding-bottom: 50px;
    padding-left : 15px;
    font-size: 16px;
    background: rgba(255, 255, 255, 0.2);
    outline : none;
    border-radius: 20px;
    box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
    border : none;
    border-right : 1px solid rgba(255, 255, 255, 0.2);
    border-bottom : 1px solid rgba(255, 255, 255, 0.2);
    letter-spacing: 1px;
    color : #333;
  }
`;

const FormContents = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
`;

function UpImgForm() {
    const [imageFile, setImageFile] = useState(null);
  
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      handleFileUpload(file);
    };

    const handleFileUpload = useCallback((file) => {
      if (file) {
        // Check if the file is an image
        if (!file.type.startsWith('image/')) {
          alert('이미지 데이터만 가능합니다.');
          return;
        }
    
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setImageFile(reader.result);
        };
      } else {
        alert('No file chosen.');
      }
    }, []);

    const handleDrop = useCallback((event) => {
      event.preventDefault();
      const file = event.dataTransfer.files[0];
      handleFileUpload(file);
    }, [handleFileUpload]);

    const handleDragOver = (event) => {
      event.preventDefault();
    };

    return (
      <FormBox onDrop={handleDrop} onDragOver={handleDragOver}>
      <FormContents>
        <ImageBox>
          {imageFile ? (
            <Image>
              <img src={imageFile} />
            </Image>
          ) : (
            <UploadPrompt>
              <Image>
                <img src="/img/gallery.png" />
              </Image>
              <h2>이미지를 여기에 드래그 하세요.</h2>
              <label htmlFor="file-upload" className="custom-file-upload">
                파일 선택
                <input id="file-upload" type="file" onChange={handleFileChange}/>
              </label>
            </UploadPrompt>
          )}
        </ImageBox>
            <MainContents>
                <div className="ContentsBox">
                  <div className="title">
                    <InTitle>
                      <p>Title</p>
                      <input type="text" className="ttarea" placeholder="제목 입력" />
                    </InTitle>
                  </div>
                  <div className="keyword">
                    <InKeyword>
                      <p>HashTag</p>
                      <input type="text" className="karea" placeholder="키워드 입력" />
                    </InKeyword>
                  </div>
                  <div className="contents">
                    <InContents>
                      <p>Contents</p>
                      <input type="textarea" className="ctarea" placeholder="내용 입력" />
                    </InContents>
                  </div>
                </div>
            </MainContents>
        </FormContents>
    </FormBox>
  );
}

export default UpImgForm;