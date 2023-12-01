window.onscroll = function () {
  if(document.documentElement.scrollTop > 60) {
    document.getElementsByClassName("application-header-container")[0].classList.add("application-header-container-minimize");
      document.getElementsByClassName("business-image-container")[0].classList.add("hiden-container");
      let textAndIcon = document.getElementsByClassName("icon-and-text")
      for(let i = 0; i < textAndIcon.length; i++){
        textAndIcon[i].classList.add("hiden-container")
      }
  }else{
    document.getElementsByClassName("application-header-container")[0].classList.remove("application-header-container-minimize");
    document.getElementsByClassName("business-image-container")[0].classList.remove("hiden-container");
    let textAndIcon = document.getElementsByClassName("icon-and-text")
    for(let i = 0; i < textAndIcon.length; i++){
      textAndIcon[i].classList.remove("hiden-container")
    }
  }
}

function scrollToElementId(id) {
  var element = document.getElementById(id);
  var rect = element.getBoundingClientRect();
  var offset = rect.top - document.body.getBoundingClientRect().top;
  console.log(rect.top);
  if(offset > 151){
    window.scrollTo({
        top: offset - 170,
        behavior: "smooth"
    });
  }
}