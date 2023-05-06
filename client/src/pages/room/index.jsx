import React from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import axios from "../../utils/axios";

const RoomPage = () => {
  const { roomId } = useParams();
  const myMeeting = (element) => {
    const appID = process.env.REACT_APP_ZEGO_APP_ID
    const serverSecret = process.env.REACT_APP_ZEGO_SECRET_ID
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      Date.now().toString(),
      "irfan"
    );

    //store this url in the appointment collection and use it when use click the active session

    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
            name:"Copy Link",
            url:`localhost:3000/room/${roomId}`
        }
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
       },
       showScreenSharingButton:false,
    })
  };

  return (
    <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: '100vw', height: '100vh' }}
    ></div>
  );
};

export default RoomPage;
