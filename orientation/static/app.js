class Chatbox{
    constructor() {
        this.args={
            openButton: document.querySelector('.chatbox__button'),
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button'),
            chatboxbyid: document.getElementById('chatbox__support__id'),

        }
        this.state= false;
        this.messages=[];
    }

    display(){
        const {openButton, chatBox, sendButton,chatboxbyid} = this.args;
        openButton.addEventListener('click', () => this.toggleState(chatBox));
        sendButton.addEventListener('click', () => this.onSendButton(chatBox))

        const node= chatBox.querySelector('input');
        node.addEventListener("keyup", ({key}) => {
            if (key =="Enter"){
                this.onSendButton(chatBox)
            }
        })
    }
    prompt(chatbox) {
        this.messages.push({ name: "Bot", message: "I am Bot, and I can help answer your simple queries." });
        this.updateChatText(chatbox)
    }

    toggleState(chatBox){
        this.state= !this.state;

        //show or hides the box 
        if(this.state){
            chatBox.classList.add('chatbox--active')
        }else{
            chatBox.classList.remove('chatbox--active')
        }
    }

    onSendButton(chatBox){
        var textField = chatBox.querySelector('input');
        let text1 = textField.value
        if (text1 == ""){
            return;
        }

        let msg1 ={name: "User", message: text1}
        this.messages.push(msg1);

        // 'http://127.0.0.1:5000/predict
        fetch($SCRIPT_ROOT + '/predict', {
            method: 'POST',
            body: JSON.stringify({message:text1}),
            // mode:'core',
            headers:{
                'Content-Type': 'application/json'
            },
        })
        .then(r => r.json())
        .then(r => {
            let msg2 = {name:"Ori", message: r.answer };
            this.messages.push(msg2)
            this.updateChatText(chatBox)
            textField.value=''
        }).catch((error) => {
            console.error('Error:', error);
            this.updateChatText(chatBox)
            textField.value=''
        });
    }

    updateChatText(chatBox){
        var html ='';
        this.messages.slice().reverse().forEach(function(item,){
            if (item.name=="Ori")
            {
                html+= '<div class="messages__item messages__item--visito">' + item.message + '</div>'
            }else{
                html+= '<div class="messages__item messages__item--operator">' + item.message + '</div>'

            }
        });

        const chatmessage= chatBox.querySelector('.chatbox__messages');
        chatmessage.innerHTML = html;
    }
} 

const chatbox = new Chatbox();
chatbox.display();

$(document).ready(function(){
    $(window).scroll(function(){
        // sticky navbar on scroll script
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
        }else{
            $('.navbar').removeClass("sticky");
        }
        
        // scroll-up button show/hide script
        if(this.scrollY > 500){
            $('.scroll-up-btn').addClass("show");
        }else{
            $('.scroll-up-btn').removeClass("show");
        }
    });
    // slide-up script
    $('.scroll-up-btn').click(function(){
        $('html').animate({scrollTop: 0});
        // removing smooth scroll on slide-up button click
        $('html').css("scrollBehavior", "auto");
    });
    $('.navbar .menu li a').click(function(){
        // applying again smooth scroll on menu items click
        $('html').css("scrollBehavior", "smooth");
    });
    // toggle menu/navbar script
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });
});