var body = document.body
var usValueRegex =  /^\$(\d{1,3}(\,\d{3})*|(\d+))(\.\d{2})?$/gi;
var savedIncome;

function handleText(textNode) {
  var text = textNode.nodeValue;

  if (text.match(usValueRegex)) {
    var cost = text.replace("$", "");
    var hourPerDollar =  (parseFloat(cost)/savedIncome).toFixed(2);
    if (hourPerDollar > 0) {
      textNode.nodeValue = text + formatedOutput(hourPerDollar);
    }

  }
}

function formatedOutput(hourPerDollar) {
  return " (" + hourPerDollar +" hours of work)";
}

function init() {
  chrome.storage.sync.get(
    ["income"]
  , function(items) {
    savedIncome = parseInt(items.income);
    handleNode(body);
  });
}

/*http://stackoverflow.com/questions/5904914/javascript-regex-to-replace-text-not-in-html-attributes/5904945#5904945*/
function handleNode(node) {
  var child, next;

  switch (node.nodeType) {
    case Node.ELEMENT_NODE:
    case Node.DOCUMENT_NODE:  // Document
    case Node.DOCUMENT_FRAGMENT_NODE: // Document fragment
      child = node.firstChild;
      while (child) {
        next = child.nextSibling;
        handleNode(child);
        child = next;
      }
      break;
    case 3: // Text node
      handleText(node);
      break;
  }
}

init();
