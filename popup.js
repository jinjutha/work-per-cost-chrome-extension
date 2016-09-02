function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

function save_options() {
  var income = document.getElementById('income').value;

  chrome.storage.sync.set({
    income: income,
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    renderStatus("Income value updated.");
    setTimeout(function() {
      renderStatus('');
    }, 1000);
  });
}

// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    income: 12,
  }, function(items) {
    document.getElementById('income').value = items.income;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
