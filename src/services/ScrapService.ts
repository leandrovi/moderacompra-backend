import axios from "axios";
import cheerio from "cheerio";

import { ListScrap, ProductScrap } from "../entities/ScrapEntity";

export default class ScrapService {
  public async parse(url: string): Promise<ListScrap> {
    const scrappedList: ListScrap = { products: [], totalCount: 0 };
    let totalProducts = 0;

    const response = await axios.get(url);

    const html = response.data;
    const $ = cheerio.load(html);

    $("#tabResult tr").each(function () {
      const regex1 = /([\d].[\d]*)|([\d])/g;

      const name_product = $(this).find("span.txtTit").text().trim();
      const code_product = $(this).find("span.RCod").text().trim();
      const quant_product = $(this).find("span.Rqtd").text().trim();
      const measure_product = $(this).find("span.RUN").text().trim();

      const un_measure = measure_product.substring(
        measure_product.indexOf(":") + 1,
        measure_product.length
      );

      const unity_val = $(this).find("span.RvlUnit").text().trim();

      const unit_product: ProductScrap = {
        description: name_product.toString(),
        code: code_product.match(regex1).toString(),
        quantity: Number.parseInt(quant_product.match(regex1).toString()),
        unity_measure: un_measure,
        unitary_value: Number.parseFloat(
          unity_val.match(regex1).toString().replace(",", ".")
        ),
      };

      scrappedList.products.push(unit_product);
      totalProducts += 1;
    });

    scrappedList.totalCount = totalProducts;

    return scrappedList;
  }
}
