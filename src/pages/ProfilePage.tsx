import axios from "axios";
import { useEffect, useState } from "react";
import { showErrorToast, showSuccessToast } from "../toastifySetup";
import socket from "./socket";
import { IoIosNotificationsOutline } from "react-icons/io";


const ProfilePage = () => {

  const [conversations, setConversations] = useState<any>([]);
  const [myMessage, setMessage] = useState<any>('');
  const [messageLoading, setMessageLoading] = useState(false);
  const [notification, setNotification] = useState<any>(0);

  const userId = '486459010555560'

const handleMessageChange = (e:any) => {
    setMessage(e.target.value)
}

const sendMessage = async () => {
    try {
        const userMessage = myMessage;

        if(!userMessage) return alert('Please enter a message')
        setMessageLoading(true)
        const response = await axios.post('https://facebook-oauth-ihe6.onrender.com/send-message', {
            userId: userId,
            message:userMessage
        });
        if(response.status !== 200){
            setMessageLoading(false)
           return showErrorToast(response.data.message)
        }
        // socket.emit("sendMessage", { userId, message: userMessage })
        setNotification((prevNotification: any) => prevNotification)
        setMessage('')
        setMessageLoading(false)
        return showSuccessToast(response.data.message)
    } catch (error) {
        console.error(error);
    }

}

const getConversations = async () => {
  try {
    const response = await axios.get('https://facebook-oauth-ihe6.onrender.com/converse');
    setConversations(response.data.data.reverse());
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  const handleNewMessage = () => {
    getConversations();
  setNotification(notification + 1);
    };
    socket.on("newMessage", handleNewMessage);
    return () => {
    socket.off("newMessage", handleNewMessage);
  };
}, [notification]);


  return (
    <div className="flex bg-black justify-around w-full h-screen">
    <div className="bg-black h-screen w-full flex justify-center items-center">
      <div className="bg-gray-700 h-[99%] w-[40%] rounded-3xl flex items-center justify-center">
        <div className="bg-gray-500 h-[97%] w-[93%] rounded-3xl flex flex-col justify-between">
          <div className="h-[65%] rounded-tl-3xl rounded-tr-3xl pb-4 pt-4 p-2 overflow-y-scroll">
            {conversations.length? (conversations.map((element:any, index:number) => (
              <div key={index} className={`${element.userName === '_akemini_' ? 'bg-blue-900' : 'bg-red-900'}  m-3 p-4 ${element.userName === '_akemini_' ? 'text-right' : ''} rounded-2xl flex flex-col`}>
                <p className="text-white font-bold">{element.userName}</p>
                <p className="text-white text-xs italic">
                  {element.date} {element.time}
                </p>
                <p className="text-white">{element.message}</p>
              </div>
            ))): <p className="text-white text-center">No messages yet</p>}
          </div>
          <div className="h-[35%] flex flex-col justify-center bg-gray-300 items-center rounded-2xl">
            <textarea
              placeholder="enter your message here"
              className="h-[90%] p-4 w-[100%] bg-gray-300"
              value={myMessage}
              onChange={handleMessageChange}
            />
            <hr className="bg-gray-900 h-[2px] w-full my-2" />
            <button onClick={sendMessage} className="p-4 bg-red-800 text-white border hover:bg-gray-400 hover:text-red-800 w-[60%] mt-2 mb-2 rounded-2xl">
              {messageLoading ? 'Sending...' : 'Send'}
            </button>
          </div>
        </div>
      </div>
    </div>
      <div className="flex w-[70px] h-[50px] hover:cursor-pointer">
        <IoIosNotificationsOutline className="text-white font-extrabold text-5xl p-0" />
        <p className="text-green-400 font-extrabold">{notification}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
