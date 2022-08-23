import { useEffect, useState } from 'react';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Chat = ({socket}) => {

  const [allMessages, setAllMessages] = useState([]);
  const [texts, setTexts] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:4000/chat/get-chats').then((res) => {
      if(res.data.status === true) {
        setAllMessages(res.data.messages);
      }
    }).catch((err) => {
      console.log(err);
    })
  }, [])
  socket.current.on('new-message', (msgs) => {
    // console.log(allMessages);
    setAllMessages([...allMessages, msgs]);
  }) 

  const sendMessage = () => {
    setIsLoading(true);
    axios.post('http://localhost:4000/chat/post-chats', {text: texts}).then((res) => {
      if(res.data.status === true) {
        // console.log(res.data)
        chatMessage(res.data.text);
      }
    }).catch((err) => {
      setIsLoading(false);
      console.log(err);
    })
  }

  const chatMessage = (msg) => {
    socket.current.emit('get-message', msg)
    setTexts("");
    setIsLoading(false);
  }
  return (
    <>
      <div className='row m-3 pt-3' style={{height: window.screen.height - 210}}>
        <div className='col-12 bg-white h-100'>
          <div className='row shadow'>
            <div className='col-3 py-2'>
              <div className='d-flex justify-content-between'>
                <p className='text-muted h6'>Live Chat</p>
                <button className='btn btn-primary rounded-circle'> <FontAwesomeIcon icon='plus' /> </button>
              </div>
            </div>
            <div className='col-9 py-2'>
              <p>Select Any User to Start Chat</p>
            </div>
          </div>
          {/*  */}
          <div className='row'>
            <div className='col-3'></div>
            <div className='col-9 liveChat' style={{backgroundColor: '#d9d9d9', height: window.screen.height - 278, overflowY: 'scroll'}}>
                <div>
                  {allMessages.map((message, ind) => (
                    <p key={ind}>{message.text}</p>
                  ))}
                </div>
                <input type="text" className="form-control w-100 my-2" onChange={(e) => setTexts(e.target.value)} value={texts} placeholder="Type your message here..." name="text" />
                <button className="btn btn-info" onClick={sendMessage}>{isLoading ? <span className="spinner-border"></span> : "Send"}</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Chat;