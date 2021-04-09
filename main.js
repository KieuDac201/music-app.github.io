let hongNhan = document.querySelector('.hongNhan')
const btnPlay = document.querySelector('.btn-play')
const timeProgressE = document.querySelector('#time-progress')
const timeCurrentE = document.querySelector('.time-current')
const timeRestE = document.querySelector('.time-rest')
const btnHeart = document.querySelector('.btn-heart')
const btnNext = document.querySelector('.btn-next')
const btnPrev = document.querySelector('.btn-prev')
const songName = document.querySelector('.song-name')
const singerName = document.querySelector('.singer-name')

let a;
let currentIndex = 0;

const data = [
    {
        song: 'Đom Đóm',
        singer: 'Jack',
        src: './music/DomDom.m4a'
    },
    {
        song: 'Sóng Gió',
        singer: 'Hương Ly',
        src: './music/SongGio.m4a'
    },
    {
        song: 'Từ Thích Thành Thương',
        singer: 'Amee - Hoàng Dũng',
        src: './music/ThichThanhThuong.m4a'
    },
    {
        song: 'Hẹn Yêu',
        singer: 'Minh Vương',
        src: './music/HenYeu.m4a'
    },
    {
        song: 'Hồng Nhan',
        singer: 'Jack',
        src: './music/HongNhan.m4a'
    },
]

songName.innerHTML = data[currentIndex].song;
singerName.innerHTML = data[currentIndex].singer;
hongNhan.setAttribute('src', data[currentIndex].src);

timeProgressE.addEventListener('change', e => {
    const value = e.target.value;
    timeProgressE.value = value;
    hongNhan.currentTime = hongNhan.duration / 100 * value;
})


btnPlay.addEventListener('click', () => {
    if(hongNhan.paused){
        playSong()
    }else{
        pauseAudio()
    }
})

btnHeart.addEventListener('click', () => {
    if(btnHeart.innerHTML == '<i class="far fa-heart"></i>'){
        btnHeart.innerHTML = '<i class="fas fa-heart"></i>'
    }else{
        btnHeart.innerHTML = '<i class="far fa-heart"></i>'
    }
})
btnNext.addEventListener('click', nextSong)
btnPrev.addEventListener('click', prevSong)
/* ========== FUNCTION ===========*/
function playSong() {
    
    
    hongNhan.play()
    btnPlay.innerHTML = '<i class="fas fa-pause"></i>'
    
    timeCurrentE.textContent = getCurrentSeconds()
    timeRestE.textContent = getRestSeconds() 
    a = setInterval(() => {
        
        timeCurrentE.textContent = getCurrentSeconds()
        timeRestE.textContent = getRestSeconds()
        timeProgressE.value = getCurrentPercent(); 
        console.log('a');
        if(timeProgressE.value >= 100){
            clearInterval(a)
            changeSong()
        }
    },1000)
}

function pauseAudio(){
    hongNhan.pause()  
    clearInterval(a)
    btnPlay.innerHTML = '<i class="fas fa-play"></i>'
}
function nextSong(){
    currentIndex++
    if(currentIndex >= data.length){
        currentIndex = 0
    }
    changeSong()
}
function prevSong(){
    currentIndex--
    if(currentIndex < 0){
        currentIndex = data.length - 1
    }
    changeSong()
}
function changeSong(){
    currentIndex++
    
    songName.innerHTML = data[currentIndex].song;
    singerName.innerHTML = data[currentIndex].singer;
    hongNhan.setAttribute('src', data[currentIndex].src)
    playSong()
}

function getCurrentPercent(){
    return Math.round(hongNhan.currentTime / hongNhan.duration * 100)
}

function getCurrentSeconds(){
    const currentTimeSecond = Math.round(hongNhan.currentTime)
    return formatSecond(currentTimeSecond)
}
function formatSecond(time){
    let minute = Math.floor(time / 60);
    let second = time    % 60;
    minute = minute < 10 ? '0' + minute : minute || '00';
    second = second < 10 ? '0' + second : second || '00';
    return minute + ':' + second
}
function getRestSeconds(){
    const restTimeSecond = Math.ceil(hongNhan.duration - hongNhan.currentTime) 
    return '-'+ formatSecond(restTimeSecond)
}

