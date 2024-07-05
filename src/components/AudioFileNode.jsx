import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { IoMdSettings, IoMdClose } from "react-icons/io";
import { Handle, Position } from "reactflow";
import "./styles.css";

export const AudioFileNode = ({ data, id }) => {
  const [audioData, setAudioData] = useState(
    data?.audioData || { file: null, showPopup: false }
  );

  const { showPopup, file } = audioData;

  const handleSettings = () => {
    const updatedData = { ...audioData, showPopup: !audioData?.showPopup };
    setAudioData(updatedData);
  };

  useEffect(() => {
    if (data?.audioData) {
      setAudioData(data.audioData);
    }
  }, [id, data]);

  const handleDelete = () => {
    data.onDelete(id);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log(selectedFile);
    if (selectedFile) {
      const updatedAudioData = { ...audioData, file: selectedFile };
      setAudioData(updatedAudioData);
      data.updateNodeData(id, "audioData", updatedAudioData);
    }
  };

  return (
    <div className="audio-files">
      <Handle
        type="target"
        position={Position.Top}
        id="aud-1"
        style={{
          backgroundColor: "grey",
          width: "10px",
          height: "10px",
          border: "1px solid black",
        }}
      />
      <div className="play-audio">
        <div className="play-audio-wrapper">
          <span className="play-audio-text">{data.label}</span>
          <div className="icons">
            <IoMdSettings
              className="play-audio-setting"
              size="20px"
              onClick={handleSettings}
            />
            <MdDelete
              style={{ color: "red" }}
              className="play-audio-delete"
              size="20px"
              onClick={handleDelete}
            />
          </div>
          {showPopup && (
            <div className="audio-popup">
              <div className="audio-popup-header">
                <span style={{ flex: 1 }}>Upload Audio File</span>
                <IoMdClose style={{ size: "20px" }} onClick={handleSettings} />
              </div>
              <input
                type="file"
                placeholder="Add audio file"
                onChange={handleFileChange}
              />
              {file && <span>{file.name}</span>}
            </div>
          )}
        </div>
      </div>

      <div className="note">
        <span>Play audio from settings</span>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="aud-2"
        style={{
          backgroundColor: "grey",
          width: "10px",
          height: "10px",
          border: "1px solid black",
        }}
      />
    </div>
  );
};
