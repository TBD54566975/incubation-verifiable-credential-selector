export function postMessage(obj) {
  obj.type = 'message';
  if (window.ReactNativeWebView) {
    window.ReactNativeWebView.postMessage(JSON.stringify(obj));
  } else {
    window.parent.postMessage(obj, '*');
  }
}
export function postAction(obj) {
  obj.type = 'action';
  if (window.ReactNativeWebView) {
    window.ReactNativeWebView.postMessage(JSON.stringify(obj));
  } else {
    window.parent.postMessage(obj, '*');
  }
}
