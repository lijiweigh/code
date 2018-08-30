export default function placeholder() {

  if ('placeholder' in document.createElement('input')) {
    return;
  }

  var elements = document.querySelectorAll('[placeholder]');

  for (var i = 0; i < elements.length; i++) {
    var span = document.createElement("span");
    elements[i].parentNode.style.position = 'relative';
    span.style.position = 'absolute';
    // span.className = 'placeholder';
    span.style.lineHeight = 1;
    span.innerHTML = elements[i].getAttribute('placeholder');
    span.style.color = getStyle(elements[i],'color');
    span.style.left = getStyle(elements[i], 'paddingLeft');
    span.style.fontSize = getStyle(elements[i],'fontSize');

    var paddingt = parseInt(getStyle(elements[i], 'paddingTop'));
    var bordert = parseInt(getStyle(elements[i], 'borderTopWidth'));

    span.style.top = paddingt + bordert + 'px';
    span.style.height = getStyle(elements[i], 'fontSize');
    span.style.width = getStyle(elements[i], 'width')

    elements[i].parentNode.appendChild(span);
    (function (span, i) {
      elements[i].onfocus = function () {
        elements[i].onpropertychange = function () {
          if (this.value !== '') {
            span.style.display = 'none';
          }
        }
      }
    })(span, i);

    (function (span, i) {
      elements[i].onblur = function () {

        if (this.value === '') {
          span.style.display = 'inline';
        } else {
          span.style.display = 'none';
        }
        elements[i].onpropertychange = null;
      }
    })(span, i);
  }

  function getStyle(obj, attr) {
    return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
  }

}