import React from "react";
import EmbeddedLink from "../../components/embedded-link";

export default function Static1() {
  return (
    <div className="p-2">
      <br />
      <p>
        <h5>
          <b>Аборт (полный) (неполный) - Таблица</b>
        </h5>
      </p>
      <p>
        <b>
          <i>Примечание</i>
        </b>
        . Следующий перечень четырехзначных подрубрик предназначен для
        использования с рубриками <EmbeddedLink mkb_code={"O03"} /> -{" "}
        <EmbeddedLink mkb_code={"O06"} /> и <EmbeddedLink mkb_code={"O08"} />.
        Проведено различие между понятиями "текущий эпизод" и "последующий
        эпизод" оказания медицинской помощи. В первом случае необходимая
        медицинская помощь оказывается одновременно и по поводу болезни или
        травмы и по поводу вытекающих из них осложнений или болезненных
        проявлений. Во втором случае необходимая медицинская помощь оказывается
        только по поводу осложнений или болезненных проявлений, вызванных
        болезнью или травмой, подвергавшихся лечению прежде.
        <br />
      </p>

      <div>
        <table className="table table-sm table-bordered">
          <tbody>
            <tr>
              <td rowspan="2">
                <h5>
                  <b>Аборт</b> <i>(продол</i>­<i>жение)</i>
                </h5>
              </td>
              <td colspan="2">
                <p className="text-center">
                  <b>
                    Ослож­нение аборта,
                    <br /> текущий эпизод (O03-O06)
                  </b>
                </p>
              </td>
              <td rowspan="2">
                <p className="text-center">
                  <b>
                    Ослож­нение
                    <br /> бере­мен­ности
                    <br /> с абор­тив­ным
                    <br /> исхо­дом,
                    <br /> после­дую­щий
                    <br /> эпи­зод (O08)
                  </b>
                </p>
              </td>
            </tr>

            <tr>
              <td>
                <p className="text-center">
                  пол­ный
                  <br /> или
                  <br /> неу­точ­нен­ный
                </p>
              </td>
              <td>
                <p className="text-center">не­пол­ный</p>
              </td>
            </tr>

            <tr>
              <td>
                <p>- ослож­нен­ный</p>
              </td>
              <td>
                <p className="text-center">8</p>
              </td>
              <td>
                <p className="text-center">3</p>
              </td>
              <td>
                <p className="text-center">9</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>- - афиб­рино­ген­емией</p>
              </td>
              <td>
                <p className="text-center">6</p>
              </td>
              <td>
                <p className="text-center">1</p>
              </td>
              <td>
                <p className="text-center">1</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>- - влияние на плод P96.4</p>
              </td>
              <td>
                <p></p>
              </td>
              <td>
                <p></p>
              </td>
              <td>
                <p></p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="text-center">
                  - - внутри­сосудис­тым сверты­ванием
                </p>
              </td>
              <td>
                <p className="text-center">6</p>
              </td>
              <td>
                <p className="text-center">1</p>
              </td>
              <td>
                <p className="text-center">1</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>- - инфек­цией</p>
              </td>
              <td>
                <p></p>
              </td>
              <td>
                <p></p>
              </td>
              <td>
                <p></p>
              </td>
            </tr>
            <tr>
              <td>
                <p>- - - моче­вого тракта</p>
              </td>
              <td>
                <p className="text-center">8</p>
              </td>
              <td>
                <p className="text-center">3</p>
              </td>
              <td>
                <p className="text-center">8</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>- - - поло­вых органов</p>
              </td>
              <td>
                <p className="text-center">5</p>
              </td>
              <td>
                <p className="text-center">0</p>
              </td>
              <td>
                <p className="text-center">0</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>- - - тазовых органов</p>
              </td>
              <td>
                <p className="text-center">5</p>
              </td>
              <td>
                <p className="text-center">0</p>
              </td>
              <td>
                <p className="text-center">0</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>- - кровоте­чением (длитель­ным)</p>
              </td>
              <td>
                <p className="text-center">6</p>
              </td>
              <td>
                <p className="text-center">1</p>
              </td>
              <td>
                <p className="text-center">1</p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="text-center">
                  - - мета­боли­ческими наруше­ниями
                </p>
              </td>
              <td>
                <p className="text-center">8</p>
              </td>
              <td>
                <p className="text-center">3</p>
              </td>
              <td>
                <p className="text-center">5</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>- - некро­зом почечных канальцев</p>
              </td>
              <td>
                <p className="text-center">8</p>
              </td>
              <td>
                <p className="text-center">3</p>
              </td>
              <td>
                <p className="text-center">4</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>- - олигури­ей</p>
              </td>
              <td>
                <p className="text-center">8</p>
              </td>
              <td>
                <p className="text-center">3</p>
              </td>
              <td>
                <p className="text-center">4</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>- - оофори­том</p>
              </td>
              <td>
                <p className="text-center">5</p>
              </td>
              <td>
                <p className="text-center">0</p>
              </td>
              <td>
                <p className="text-center">0</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>- - останов­кой сердца</p>
              </td>
              <td>
                <p className="text-center">8</p>
              </td>
              <td>
                <p className="text-center">3</p>
              </td>
              <td>
                <p className="text-center">8</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>- - пара­метри­том</p>
              </td>
              <td>
                <p className="text-center">5</p>
              </td>
              <td>
                <p className="text-center">0</p>
              </td>
              <td>
                <p className="text-center">0</p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="text-center">
                  - - поврежде­нием тазовых органов или тканей НКДР
                </p>
              </td>
              <td>
                <p className="text-center">8</p>
              </td>
              <td>
                <p className="text-center">3</p>
              </td>
              <td>
                <p className="text-center">6</p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="text-center">
                  - - почеч­ной недоста­точ­ностью (острой)
                </p>
              </td>
              <td>
                <p className="text-center">8</p>
              </td>
              <td>
                <p className="text-center">3</p>
              </td>
              <td>
                <p className="text-center">4</p>
              </td>
            </tr>
            <tr>
              <td>
                <p className="text-center">
                  - - прекра­щением функции почки (ану­рия)
                </p>
              </td>
              <td>
                <p className="text-center">8</p>
              </td>
              <td>
                <p className="text-center">3</p>
              </td>
              <td>
                <p className="text-center">4</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>- - про­боде­нием</p>
              </td>
              <td>
                <p></p>
              </td>
              <td>
                <p></p>
              </td>
              <td>
                <p></p>
              </td>
            </tr>
            <tr>
              <td>
                <p>- - - кишеч­ника</p>
              </td>
              <td>
                <p className="text-center">8</p>
              </td>
              <td>
                <p className="text-center">3</p>
              </td>
              <td>
                <p className="text-center">6</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>- - - матки</p>
              </td>
              <td>
                <p className="text-center">8</p>
              </td>
              <td>
                <p className="text-center">3</p>
              </td>
              <td>
                <p className="text-center">6</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>- - - моче­вого пузыря</p>
              </td>
              <td>
                <p className="text-center">8</p>
              </td>
              <td>
                <p className="text-center">3</p>
              </td>
              <td>
                <p className="text-center">6</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>- - - пери­уретраль­ной ткани</p>
              </td>
              <td>
                <p className="text-center">8</p>
              </td>
              <td>
                <p className="text-center">3</p>
              </td>
              <td>
                <p className="text-center">6</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>- - - шейки матки</p>
              </td>
              <td>
                <p className="text-center">8</p>
              </td>
              <td>
                <p className="text-center">3</p>
              </td>
              <td>
                <p className="text-center">6</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>- - - широкой связки</p>
              </td>
              <td>
                <p className="text-center">8</p>
              </td>
              <td>
                <p className="text-center">3</p>
              </td>
              <td>
                <p className="text-center">6</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>- - разрывом</p>
              </td>
              <td>
                <p></p>
              </td>
              <td>
                <p></p>
              </td>
              <td>
                <p></p>
              </td>
            </tr>
            <tr>
              <td>
                <p>- - - кишеч­ника</p>
              </td>
              <td>
                <p className="text-center">8</p>
              </td>
              <td>
                <p className="text-center">3</p>
              </td>
              <td>
                <p className="text-center">6</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>- - - матки</p>
              </td>
              <td>
                <p className="text-center">8</p>
              </td>
              <td>
                <p className="text-center">3</p>
              </td>
              <td>
                <p className="text-center">6</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>- - - мочевого пузыря</p>
              </td>
              <td>
                <p className="text-center">8</p>
              </td>
              <td>
                <p className="text-center">3</p>
              </td>
              <td>
                <p className="text-center">6</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>- - - пери­уретраль­ной ткани</p>
              </td>
              <td>
                <p className="text-center">8</p>
              </td>
              <td>
                <p className="text-center">3</p>
              </td>
              <td>
                <p className="text-center">6</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>- - - шейки матки</p>
              </td>
              <td>
                <p className="text-center">8</p>
              </td>
              <td>
                <p className="text-center">3</p>
              </td>
              <td>
                <p className="text-center">6</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>- - - широкой связки</p>
              </td>
              <td>
                <p className="text-center">8</p>
              </td>
              <td>
                <p className="text-center">3</p>
              </td>
              <td>
                <p className="text-center">6</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>- - сальпин­гитом</p>
              </td>
              <td>
                <p className="text-center">5</p>
              </td>
              <td>
                <p className="text-center">0</p>
              </td>
              <td>
                <p className="text-center">0</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>- - сальпин­гоофори­том</p>
              </td>
              <td>
                <p className="text-center">5</p>
              </td>
              <td>
                <p className="text-center">0</p>
              </td>
              <td>
                <p className="text-center">0</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>- - сепсисом</p>
              </td>
              <td>
                <p className="text-center">5</p>
              </td>
              <td>
                <p className="text-center">0</p>
              </td>
              <td>
                <p className="text-center">0</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>- - септице­мией</p>
              </td>
              <td>
                <p className="text-center">5</p>
              </td>
              <td>
                <p className="text-center">0</p>
              </td>
              <td>
                <p className="text-center">0</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>- - септичес­ким шоком</p>
              </td>
              <td>
                <p className="text-center">5</p>
              </td>
              <td>
                <p className="text-center">0</p>
              </td>
              <td>
                <p className="text-center">0</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>- - синдро­мом дефибри­нации</p>
              </td>
              <td>
                <p className="text-center">6</p>
              </td>
              <td>
                <p className="text-center">1</p>
              </td>
              <td>
                <p className="text-center">1</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>- - сосудис­тым коллапсом</p>
              </td>
              <td>
                <p className="text-center">8</p>
              </td>
              <td>
                <p className="text-center">3</p>
              </td>
              <td>
                <p className="text-center">3</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>- - тазовым перитонитом</p>
              </td>
              <td>
                <p className="text-center">5</p>
              </td>
              <td>
                <p className="text-center">0</p>
              </td>
              <td>
                <p className="text-center">0</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>- - уремией</p>
              </td>
              <td>
                <p className="text-center">8</p>
              </td>
              <td>
                <p className="text-center">3</p>
              </td>
              <td>
                <p className="text-center">4</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>- - уточнен­ным состоянием НКДР</p>
              </td>
              <td>
                <p className="text-center">8</p>
              </td>
              <td>
                <p className="text-center">3</p>
              </td>
              <td>
                <p className="text-center">8</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>- - химичес­ким поврежде­нием</p>
              </td>
              <td>
                <p></p>
              </td>
              <td>
                <p></p>
              </td>
              <td>
                <p></p>
              </td>
            </tr>
            <tr>
              <td>
                <p>- - - кишеч­ника</p>
              </td>
              <td>
                <p className="text-center">8</p>
              </td>
              <td>
                <p className="text-center">3</p>
              </td>
              <td>
                <p className="text-center">6</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>- - - матки</p>
              </td>
              <td>
                <p className="text-center">8</p>
              </td>
              <td>
                <p className="text-center">3</p>
              </td>
              <td>
                <p className="text-center">6</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>- - - мочевого пузыря</p>
              </td>
              <td>
                <p className="text-center">8</p>
              </td>
              <td>
                <p className="text-center">3</p>
              </td>
              <td>
                <p className="text-center">6</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>- - - пери­урет­раль­ной ткани</p>
              </td>
              <td>
                <p className="text-center">8</p>
              </td>
              <td>
                <p className="text-center">3</p>
              </td>
              <td>
                <p className="text-center">6</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>- - - шейки матки</p>
              </td>
              <td>
                <p className="text-center">8</p>
              </td>
              <td>
                <p className="text-center">3</p>
              </td>
              <td>
                <p className="text-center">6</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>- - - широкой связки</p>
              </td>
              <td>
                <p className="text-center">8</p>
              </td>
              <td>
                <p className="text-center">3</p>
              </td>
              <td>
                <p className="text-center">6</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>- - шоком (после­опера­цион­ным)</p>
              </td>
              <td>
                <p className="text-center">8</p>
              </td>
              <td>
                <p className="text-center">3</p>
              </td>
              <td>
                <p className="text-center">3</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>- - электро­лит­ным дисбалансом</p>
              </td>
              <td>
                <p className="text-center">8</p>
              </td>
              <td>
                <p className="text-center">3</p>
              </td>
              <td>
                <p className="text-center">5</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>- - эмболией</p>
              </td>
              <td>
                <p className="text-center">7</p>
              </td>
              <td>
                <p className="text-center">2</p>
              </td>
              <td>
                <p className="text-center">2</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>- - - амниоти­ческой жидкостью</p>
              </td>
              <td>
                <p className="text-center">7</p>
              </td>
              <td>
                <p className="text-center">2</p>
              </td>
              <td>
                <p className="text-center">2</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>- - - воздушной</p>
              </td>
              <td>
                <p className="text-center">7</p>
              </td>
              <td>
                <p className="text-center">2</p>
              </td>
              <td>
                <p className="text-center">2</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>- - - легочной</p>
              </td>
              <td>
                <p className="text-center">7</p>
              </td>
              <td>
                <p className="text-center">2</p>
              </td>
              <td>
                <p className="text-center">2</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>- - - от моющих средств</p>
              </td>
              <td>
                <p className="text-center">7</p>
              </td>
              <td>
                <p className="text-center">2</p>
              </td>
              <td>
                <p className="text-center">2</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>- - - пиемичес­кой</p>
              </td>
              <td>
                <p className="text-center">7</p>
              </td>
              <td>
                <p className="text-center">2</p>
              </td>
              <td>
                <p className="text-center">2</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>- - - сгустком крови</p>
              </td>
              <td>
                <p className="text-center">7</p>
              </td>
              <td>
                <p className="text-center">2</p>
              </td>
              <td>
                <p className="text-center">2</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>- - - септико­пиеми­ческой</p>
              </td>
              <td>
                <p className="text-center">7</p>
              </td>
              <td>
                <p className="text-center">2</p>
              </td>
              <td>
                <p className="text-center">2</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>- - - септичес­кой</p>
              </td>
              <td>
                <p className="text-center">7</p>
              </td>
              <td>
                <p className="text-center">2</p>
              </td>
              <td>
                <p className="text-center">2</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>- - эндомет­ритом</p>
              </td>
              <td>
                <p className="text-center">5</p>
              </td>
              <td>
                <p className="text-center">0</p>
              </td>
              <td>
                <p className="text-center">0</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
