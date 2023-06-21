let untyped = '';
let typed = '';
let score=0;

const untypedfield=document.getElementById('untyped');
const typedfield=document.getElementById('typed');
const wrap=document.getElementById('wrap');
const start=document.getElementById('start');
const count=document.getElementById('count');

const textLists = [
  'Hello World','This is my App','How are you?',
  'Today is sunny','I love JavaScript!','Good morning',
  'I am Japanese','Let it be','Good luck',
  'Typing Game','Information Technology',
  'I want to be a programmer','What day is today?',
  'I want to build a web app','Nice to meet you',
  'Chrome Firefox Edge Safari','machine learning',
  'Brendan Eich','John Resig','React Vue Angular',
  'Netscape Communications','undefined null NaN',
  'Thank you very much','Google Apple Facebook Amazon',
  'ECMAScript','console.log','for while if switch',
  'var let const','Windows Mac Linux iOS Android','programming'
];

const createText =()=> {
  typed = '';
  typedfield.textContent=typed;
  let random=Math.floor(Math.random()*textLists.length);
  untyped=textLists[random];
  untypedfield.textContent = untyped;
};

const keyPress =e=> {
  if(e.key!=untyped.substring(0,1)){
    wrap.classList.add('mistyped');
    setTimeout(()=>{
      wrap.classList.remove('mistyped');
    },100);
    return;
  }
  score++;
  typed+=untyped.substring(0,1);
  untyped=untyped.substring(1);
  typedfield.textContent=typed;
  untypedfield.textContent=untyped;

  if(untyped==''){
    createText();
  }
};

const rankCheck =score=> {
  let text='';

  if(score<=99){
    text=`あなたのランクはCです。\nあと${100-score}でBランクです。`
  }else if((100<=score)&&(score<=199)){
    text=`あなたのランクはBです。\nあと${200-score}でAランクです。`
  }else if((200<=score)&&(score<=299)){
    text=`あなたのランクはAです。\nあと${300-score}でSランクです。`
  }else if(300<=score){
    text='あなたのランクはSです。おめでとうございます!'
  }
  return `${score}文字打てました!\n${text}\n【OK】リトライ / 【キャンセル】終了`;
};

const gameOver =id=> {
  clearInterval(id);
  const result=confirm(rankCheck(score));

  if(result==true){window.location.reload()};
};

const timer =()=> {
  let time=60;

  const id=setInterval(()=>{
    if(time<=0){
      gameOver(id);
    }

    count.textContent=time--;

  },1000);
};

document.addEventListener('click',()=>{
  timer();
  createText();
  start.style.display='none';
  document.addEventListener('keypress',keyPress);
});

untypedfield.textContent='スタートボタンで開始';