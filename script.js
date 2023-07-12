const imageContainer=document.getElementById('image-container');
const loader=document.getElementById("loader");
let ready=false;
let imagesLoaded=0;
let totalImage=0;
let photosArray=[]

const AccessKey='7A7d7P5zvOfSglHd6xDlQqufR3EMYQT0-yy1typCNUM';
const count=10;





const apiUrl=`https://api.unsplash.com/photos/random?client_id=${AccessKey}&count=${count}`

// check if all image are loaded
 function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded==totalImage){
        ready=true;
        loader.hidden=true;
    }
 }

function displayImage(){
    imagesLoaded=0;
    totalImage=photosArray.length;
    photosArray.forEach((photo)=>{
        const item=document.createElement('a');
        item.setAttribute('href',photo.links.html);
        item.setAttribute('target','_blank');
    
        const img=document.createElement('img');
        img.setAttribute('src',photo.urls.regular);
        img.setAttribute('alt',photo.alt_description);
        img.setAttribute('title',photo.alt_description);
        // event listener check when image loading is done;
        document.addEventListener('load',imageLoaded())

        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}







async function getPhotos(){
    try{
        const response=await fetch(apiUrl);
        photosArray=await response.json();
        console.log(photosArray);
        displayImage();
    }catch(err){
        console.log("not loading")
    }
}
// load image when reach 
window.addEventListener('scroll',()=>{
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight -1000 && ready){
        ready=false
        getPhotos();
    }
})

// onload
getPhotos();