import axios from "axios";
import cheerio from "cheerio";
import { ListScrap, ProductScrap } from "../entities/ScrapEntity";

export default class ScrapService {
  public async parse(url: string): Promise<ListScrap> {
    //objeto que será retornado
    const objTest: ListScrap = { products: [], totalCount: 0 };
    var totalProducts = 0;

    const response = await axios.get(url);

    const html = response.data;
    const $ = cheerio.load(html);

    const tabela = $("#tabResult tr").each(function () {
      //var regex1 = /([0-9].[0-9])\w+/g;
      var regex1 = /([\d].[\d]*)|([\d])/g;

      var name_product = $(this).find("span.txtTit").text().trim();

      var code_product = $(this).find("span.RCod").text().trim();
      var quant_product = $(this).find("span.Rqtd").text().trim();
      var measure_product = $(this).find("span.RUN").text().trim();
      var un_measure = measure_product.substring(
        measure_product.indexOf(":") + 1,
        measure_product.length
      );
      var unity_val = $(this).find("span.RvlUnit").text().trim();

      const unit_product: ProductScrap = {
        description: name_product.toString(),
        code: code_product.match(regex1).toString(),
        quantity: Number.parseInt(quant_product.match(regex1).toString()),
        unity_measure: un_measure,
        unitary_value: Number.parseFloat(
          unity_val.match(regex1).toString().replace(",", ".")
        ),
      };

      objTest.products.push(unit_product);
      totalProducts += 1;
    });

    objTest.totalCount = totalProducts;
    //console.log(objTest);
    return objTest;
  }
}
