import { useEffect, useState } from "react";

const RightContent = ({ dataQuiz,submit,setIndex }) => {
    const setClassName=(item)=>{
        if(item&&item.answers){
            const index=item.answers.findIndex((item)=>{
                return item.isSelected===true
            })
            if(index!==-1){
                return `question question-${item.id} selected`
            }
        }
        return `question question-${item.id} `
    }
    const handleClick=(id,index)=>{
        const questions= document.querySelectorAll(".question");
        questions.forEach((q)=>{
            if(q.classList.contains("clicked")){
                q.classList.remove("clicked")
            }
            if(q.classList.contains(`question-${id}`)){
                q.classList.add("clicked");
            }
        })

        setIndex(index)
    }
  return (
    <>
      <CountDown handleSubmit={submit}/>
      <div className="main-question">
        {dataQuiz &&
          dataQuiz.length > 0 &&
          dataQuiz.map((q, index) => {
            return (
              <div onClick={()=>{handleClick(q.id,index)}}  className={setClassName(q)} key={index}>
                {index + 1}
              </div>
            );
          })}
      </div>
    </>
  );
};
export default RightContent;

const CountDown = ({handleSubmit}) => {
    const [time,setTime]=useState(600);
    const [timeToString,setTimeToString]=useState("10:00")
    useEffect(()=>{
        const idTime= setInterval(()=>{
            if(time>0){
                setTime(time-1);
            }
        },1000)
        converTime();
        return()=>{
            clearInterval(idTime)
        }
    },[time])

    const converTime=()=>{
        if(time === 0){
            handleSubmit();
        }else{
            const minus=Math.floor(time/60);
            const second= time - minus*60;
            setTimeToString(`${minus}:${second}`)
        }
      
    }

  return (
    <>
      <div className="main-timer">{timeToString}</div>
    </>
  );
};
