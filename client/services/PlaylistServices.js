export async function getVideoInfo(data) {
    // const response = await fetch(`/api/getVideoInfo`, {
    const response = await fetch(`/api/getVideoInfo`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({url: data})
      })
  console.log(response)
    return await response.json();
}

