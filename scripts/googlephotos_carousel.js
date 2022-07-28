/***************************************************************************************************
 * USAGE:
 * 1. First, go here:
 *  https://www.publicalbum.org/blog/embedding-google-photos-albums
 * and paste the google photos album link into the box in step 2.
 * 2. Next, Copy-paste the resulting HTML code into your page.
 * 3. Finally, replace the .js filename with this one, i.e.
 * Replace this:
 *  <script src="https://cdn.jsdelivr.net/npm/publicalbum@latest/embed-ui.min.js" async></script>
 * with this:
 *  <script src="/scripts/googlephotos_carousel.js" async></script>
 * Note: the "data-delay" property defines the auto-advance rate in seconds.
 *       other attributes are ignored.
 **************************************************************************************************/

function advance(div) {
  if (div.getAttribute("autoadvance") == "true" && div.getAttribute("pause") == "false") {
    const thumbs = div.getElementsByClassName("thumb");
    var i = parseInt(div.getAttribute("index"));
    i = (i + 1) % thumbs.length;
    thumbs[i].onmouseover(null, true);
    div.setAttribute("index", i);
  }
}
function wrap(wrapper, toWrap) {
  toWrap.parentNode.insertBefore(wrapper, toWrap);
  wrapper.appendChild(toWrap);
  return wrapper;
}
function wrap_div_class(classname, toWrap) {
  wrapper = document.createElement('div');
  wrapper.className = classname;
  return wrap(wrapper, toWrap);
}
function replace_object(obj, index) {
  const div = document.createElement('div');
  div.className = "thumb";
  div.style.backgroundImage = "url('" + obj.data + "')";
  div.style.backgroundSize = "contain";
  div.setAttribute("data-caption", "null");
  div.id = "thumb_" + index;
  div.onmouseover = function (mouseEvent, manual = false) {
    const parent = div.parentElement;
    main = parent.parentElement.parentElement.getElementsByClassName("main")[0];
    main.style.backgroundImage = div.style.backgroundImage;
    for (const thumb of parent.getElementsByClassName("thumb")) {
      thumb.style.opacity = 0.5;
    }
    div.style.opacity = 1;
    if (!manual) {
      parent.setAttribute("index", parent.getAttribute("index"));
      parent.setAttribute("pause", true);
      parent.setAttribute("index", index);
    }
  }
  div.onmouseleave = function () {
    div.parentElement.setAttribute("pause", false);
  }
  div.onmousedown = function () {
    div.parentElement.setAttribute("autoadvance", false);
  }
  obj.replaceWith(div);
}
function replace_carousel(div) {
  // create wrappers
  const thumbs = div;
  div = wrap_div_class("gallery", wrap_div_class("hidden_scrollbar thumbscroll", div));

  // create thumbnails (gallery)
  thumbs.className = "thumbs";
  thumbs.style = "";
  i = 0;
  for (let child of thumbs.children) {
    replace_object(child, i++);
  }

  // Add links/buttons
  let link = document.createElement('a');
  link.href = thumbs.getAttribute("data-link");
  link.target = "_blank";
  link.text = thumbs.getAttribute("data-title") + " album link";
  link.className = "link";
  div.appendChild(link);
  let autoplay_link = document.createElement('button');
  autoplay_link.onclick = function () { thumbs.setAttribute("autoadvance", true); };
  autoplay_link.textContent = "autoplay";
  autoplay_link.className = "autoplay";
  div.appendChild(autoplay_link);
  let fwd = document.createElement('button');
  fwd.onclick = function () { thumbs.parentElement.scrollLeft += thumbs.parentElement.clientWidth * 0.5; };
  fwd.textContent = "›";
  fwd.className = "right scroll";
  div.appendChild(fwd);
  let prev = document.createElement('button');
  prev.onclick = function () { thumbs.parentElement.scrollLeft -= thumbs.parentElement.clientWidth * 0.5; };
  prev.textContent = "‹";
  prev.className = "left scroll";
  div.appendChild(prev);

  // create main
  let main = document.createElement('div');
  main.className = "main";
  div.appendChild(main);

  // initialize
  thumbs.setAttribute("index", 0);
  thumbs.setAttribute("pause", false);
  thumbs.setAttribute("autoadvance", true);
  thumbs.children[0].onmouseover(null, true);
  if (thumbs.getAttribute("data-delay") == null) {
    thumbs.setAttribute("data-delay", 5);
  }
  setInterval(function () { advance(thumbs); }, parseFloat(thumbs.getAttribute("data-delay")) * 1000);

  // wrap in extra containers
  wrap(document.createElement('section'), div).style.position = "relative";
}

for (let carousel of document.getElementsByClassName("pa-gallery-player-widget")) {
  replace_carousel(carousel)
}
for (let carousel of document.getElementsByClassName("pa-carousel-widget")) {
  replace_carousel(carousel)
}
