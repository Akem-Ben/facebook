import axios from "axios";
import { useEffect, useState } from "react";
import { showErrorToast, showSuccessToast } from "../toastifySetup";
import socket from "./socket";

const ProfilePage = () => {

  const [conversations, setConversations] = useState<any>([]);
  const [myMessage, setMessage] = useState<any>('');
  const [messageLoading, setMessageLoading] = useState(false);

  const userId = '486459010555560'

const getConversations= async () => {
    try {
      const response = await axios.get('http://localhost:3030/converse');
        setConversations(response.data.data.reverse())
    } catch (error) {
      console.error(error);
    }
}

const handleMessageChange = (e:any) => {
    setMessage(e.target.value)
}

const sendMessage = async () => {
    try {
        const userMessage = myMessage;

        if(!userMessage) return alert('Please enter a message')
        setMessageLoading(true)
        const response = await axios.post('http://localhost:3030/send-message', {
            userId: userId,
            message:userMessage
        });
        if(response.status !== 200){
            setMessageLoading(false)
           return showErrorToast(response.data.message)
        }

        setMessage('')
        setMessageLoading(false)
        return showSuccessToast(response.data.message)
    } catch (error) {
        console.error(error);
    }

}

useEffect(()=>{

getConversations()

const handleNewMessage = (message: any) => {
    setConversations((prevConversations: any) => [message, ...prevConversations]);
  };

  socket.on("newMessage", handleNewMessage);

  return () => {
    socket.off("newMessage", handleNewMessage);
  };
},[])
  return (
    <div className="bg-black h-screen flex justify-center items-center">
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
  );
};

export default ProfilePage;
