export function processData(xmlData: string) {
  // XMLデータを解析して必要な情報を取得する処理を記述
  // ここでは簡単な例として、XMLをパースして必要な情報を抽出する方法を示します
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlData, "text/xml");
  const restaurantNodes = xmlDoc.getElementsByTagName("restaurant");
  
  const restaurants = [];
  for (let i = 0; i < restaurantNodes.length; i++) {
    const id = restaurantNodes[i].getElementsByTagName("id")[0].textContent;
    const name = restaurantNodes[i].getElementsByTagName("name")[0].textContent;
    const address = restaurantNodes[i].getElementsByTagName("address")[0].textContent;
    const category = restaurantNodes[i].getElementsByTagName("category")[0].textContent;
    restaurants.push({ id, name, address, category });
  }
  
  return restaurants;
}