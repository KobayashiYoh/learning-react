import { processData } from "./DataProcessor";

export async function fetchData() {
    try {
      const accessToken = process.env.REACT_APP_POSIPAN_API_KEY;
      const url = 'http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?large_area=Z011';
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/xml'
        }
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.text(); // XML形式のデータを取得する
      const restaurants = processData(data); // データを処理する関数を呼び出す
      console.log(restaurants);
    } catch (error) {
      console.error('リクエストエラー:', error);
    }
  }