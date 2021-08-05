export async function getItems() {

  const payload = await fetch('/api/items', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const response = await payload.json();
  if (!response.success || payload.status !== 200) return {}

  return response.data;
};

export async function addItem(newItemInfo) {

  const payload = await fetch('/api/items', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newItemInfo)
  });

  const response = await payload.json();
  if (!response.success || payload.status !== 200) return {}

  return response.data;
};

