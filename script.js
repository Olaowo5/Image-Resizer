const uploadBox =document.querySelector(".upload-box"),
previewImg = uploadBox.querySelector("img"),
fileInput = uploadBox.querySelector("input"),
widthInput= document.querySelector("#WidthIm"),
heightInput= document.querySelector("#HeightIm"),
ratioInput = document.querySelector("#checkid"),
downloadBtn = document.querySelector(".download-btn"),
qualityInput = document.querySelector("#quality");

let ogImageRatio;
const loadFile =(e) =>{
    const file =e.target.files[0];
    //getting first user selected file
    if(!file) return;

    previewImg.classList.remove("imgclass");
    previewImg.src = URL.createObjectURL(file); 
    //passing selected file url to preview img src 

    previewImg.addEventListener("load", () =>{
        //once img loaded
        widthInput.value = previewImg.naturalWidth;
        heightInput.value =  previewImg.naturalHeight;
        ogImageRatio = previewImg.naturalHeight / previewImg.naturalWidth;

        document.querySelector(".wrapper").classList.add("active");
    });

}

widthInput.addEventListener("keyup", ()=>{
       //getting width according to the ratio checkbox status
       const height = ratioInput.checked ? widthInput.value / ogImageRatio 
       : widthInput.value;
       heightInput.value = Math.floor(height);
});

heightInput.addEventListener("keyup", () =>
{   //getting height according to the ratio checkbox status
    const width = ratioInput.checked ? heightInput.value * ogImageRatio 
    : heightInput.value;
    widthInput.value = Math.floor(width);
});

const resizeAndDownload= () =>{
    const canvas = document.createElement("canvas");
    const ctx =canvas.getContext("2d");
    const a =document.createElement("a");
    //if quality checkbox is checked, pass 0.7 to imgQuality else pass 1.0
    // 1.0 is 100% quality where 0.7 is 70% of total. you can pass from 0.1
    const imgQuality =qualityInput.checked ? 0.7 : 1.0;


    //setting canavs hieght & width according to the input values
    canvas.width = widthInput.value;
    canvas.height = heightInput.value;

    //drawing user selected image onto canvas\
    ctx.drawImage(previewImg,0,0, canvas.width, canvas.height);
   /// document.body.appendChild(canvas)

   a.href =canvas.toDataURL("image/jpeg", imgQuality);
   a.download = new Date().getTime();
   a.click(); //clciking <a> element so the file download
}
downloadBtn.addEventListener("click", resizeAndDownload);
fileInput.addEventListener("change",loadFile);
uploadBox.addEventListener("click",() => fileInput.click());