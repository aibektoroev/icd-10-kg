import React from "react";
import EmbeddedLink from "../../components/embedded-link";

export default function Static3() {
  return (
    <div className="p-2">
      <br />
      <p>
        <h5>
          <b>Таблица несчастных случаев с наземными транспортными средствами</b>
        </h5>
      </p>
      <br />

      <div>
        <table className="table table-sm table-bordered">
          <tbody>
            <tr>
              <td rowspan="2">
                <p>
                  <b>Жер­тва и спо­соб пере­дви­же­ния</b>
                </p>
              </td>
              <td colspan="11">
                <p className="text-center">
                  <b>При столкновении с или попадании в:</b>
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p>пеше­хо­дом или жи­вот­ным</p>
              </td>
              <td>
                <p>вело­сипе­дис­том</p>
              </td>
              <td>
                <p>2-, 3-ко­лес­ным мото­транс­порт­ным сред­ством</p>
              </td>
              <td>
                <p>легко­вым авто­моби­лем, пика­пом или фур­гон­ом</p>
              </td>
              <td>
                <p>тяже­лым тран­спорт­ным сред­ством или авто­бу­сом</p>
              </td>
              <td>
                <p>друг­им мотор­ным транс­порт­ным сред­ством</p>
              </td>
              <td>
                <p>поез­дом или дру­гим рель­со­вым транс­пор­том</p>
              </td>
              <td>
                <p>
                  дру­гим не­мо­тор­ным транс­порт­ным сред­ством (в т.ч.
                  по­воз­кой, за­пря­жён­ной жи­вот­ным)
                </p>
              </td>
              <td>
                <p>за­креп­лён­ным или ста­цио­нар­ным объ­ек­том</p>
              </td>
              <td>
                <p>не­счаст­ный слу­чай без столк­но­ве­ния</p>
              </td>
              <td>
                <p>
                  дру­гой или не­уточ­нён­ный транс­порт­ный не­счас­тный
                  слу­чай
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p>Пеше­ход</p>
              </td>
              <td>
                <p className="text-center">W51.-</p>
              </td>
              <td>
                <p className="text-center">V01.-</p>
              </td>
              <td>
                <p className="text-center">V02.-</p>
              </td>
              <td>
                <p className="text-center">V03.-</p>
              </td>
              <td>
                <p className="text-center">V04.-</p>
              </td>
              <td>
                <p className="text-center">V09.-</p>
              </td>
              <td>
                <p className="text-center">V05.-</p>
              </td>
              <td>
                <p className="text-center">V06.-</p>
              </td>
              <td>
                <p className="text-center">(W22.5)</p>
              </td>
              <td>
                <p className="text-center">-</p>
              </td>
              <td>
                <p className="text-center">V09.-</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>Вело­сипе­дист</p>
              </td>
              <td>
                <p className="text-center">V10.-</p>
              </td>
              <td>
                <p className="text-center">V11.-</p>
              </td>
              <td>
                <p className="text-center">V12.-</p>
              </td>
              <td>
                <p className="text-center">V13.-</p>
              </td>
              <td>
                <p className="text-center">V14.-</p>
              </td>
              <td>
                <p className="text-center">V19.-</p>
              </td>
              <td>
                <p className="text-center">V15.-</p>
              </td>
              <td>
                <p className="text-center">V16.-</p>
              </td>
              <td>
                <p className="text-center">V17.-</p>
              </td>
              <td>
                <p className="text-center">V18.-</p>
              </td>
              <td>
                <p className="text-center">V19.-</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>Мото­цик­лист</p>
              </td>
              <td>
                <p className="text-center">V20.-</p>
              </td>
              <td>
                <p className="text-center">V21.-</p>
              </td>
              <td>
                <p className="text-center">V22.-</p>
              </td>
              <td>
                <p className="text-center">V23.-</p>
              </td>
              <td>
                <p className="text-center">V24.-</p>
              </td>
              <td>
                <p className="text-center">V29.-</p>
              </td>
              <td>
                <p className="text-center">V25.-</p>
              </td>
              <td>
                <p className="text-center">V26.-</p>
              </td>
              <td>
                <p className="text-center">V27.-</p>
              </td>
              <td>
                <p className="text-center">V28.-</p>
              </td>
              <td>
                <p className="text-center">V29.-</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>Лицо, на­хо­див­шее­ся</p>
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
              <td>
                <p></p>
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
              <td>
                <p></p>
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
                <p>- в трех­ко­лес­ном мото­транс­порт­ном сред­стве</p>
              </td>
              <td>
                <p className="text-center">V30.-</p>
              </td>
              <td>
                <p className="text-center">V31.-</p>
              </td>
              <td>
                <p className="text-center">V32.-</p>
              </td>
              <td>
                <p className="text-center">V33.-</p>
              </td>
              <td>
                <p className="text-center">V34.-</p>
              </td>
              <td>
                <p className="text-center">V39.-</p>
              </td>
              <td>
                <p className="text-center">V35.-</p>
              </td>
              <td>
                <p className="text-center">V36.-</p>
              </td>
              <td>
                <p className="text-center">V37.-</p>
              </td>
              <td>
                <p className="text-center">V38.-</p>
              </td>
              <td>
                <p className="text-center">V39.-</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>- авто­мо­биле</p>
              </td>
              <td>
                <p className="text-center">V40.-</p>
              </td>
              <td>
                <p className="text-center">V41.-</p>
              </td>
              <td>
                <p className="text-center">V42.-</p>
              </td>
              <td>
                <p className="text-center">V43.-</p>
              </td>
              <td>
                <p className="text-center">V44.-</p>
              </td>
              <td>
                <p className="text-center">V49.-</p>
              </td>
              <td>
                <p className="text-center">V45.-</p>
              </td>
              <td>
                <p className="text-center">V46.-</p>
              </td>
              <td>
                <p className="text-center">V47.-</p>
              </td>
              <td>
                <p className="text-center">V48.-</p>
              </td>
              <td>
                <p className="text-center">V49.-</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>- пика­пе или фур­гоне</p>
              </td>
              <td>
                <p className="text-center">V50.-</p>
              </td>
              <td>
                <p className="text-center">V51.-</p>
              </td>
              <td>
                <p className="text-center">V52.-</p>
              </td>
              <td>
                <p className="text-center">V53.-</p>
              </td>
              <td>
                <p className="text-center">V54.-</p>
              </td>
              <td>
                <p className="text-center">V59.-</p>
              </td>
              <td>
                <p className="text-center">V55.-</p>
              </td>
              <td>
                <p className="text-center">V56.-</p>
              </td>
              <td>
                <p className="text-center">V57.-</p>
              </td>
              <td>
                <p className="text-center">V58.-</p>
              </td>
              <td>
                <p className="text-center">V59.-</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>- тяже­лом транс­порт­ном сред­стве</p>
              </td>
              <td>
                <p className="text-center">V60.-</p>
              </td>
              <td>
                <p className="text-center">V61.-</p>
              </td>
              <td>
                <p className="text-center">V62.-</p>
              </td>
              <td>
                <p className="text-center">V63.-</p>
              </td>
              <td>
                <p className="text-center">V64.-</p>
              </td>
              <td>
                <p className="text-center">V69.-</p>
              </td>
              <td>
                <p className="text-center">V65.-</p>
              </td>
              <td>
                <p className="text-center">V66.-</p>
              </td>
              <td>
                <p className="text-center">V67.-</p>
              </td>
              <td>
                <p className="text-center">V68.-</p>
              </td>
              <td>
                <p className="text-center">V69.-</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>- авто­бусе</p>
              </td>
              <td>
                <p className="text-center">V70.-</p>
              </td>
              <td>
                <p className="text-center">V71.-</p>
              </td>
              <td>
                <p className="text-center">V72.-</p>
              </td>
              <td>
                <p className="text-center">V73.-</p>
              </td>
              <td>
                <p className="text-center">V74.-</p>
              </td>
              <td>
                <p className="text-center">V79.-</p>
              </td>
              <td>
                <p className="text-center">V75.-</p>
              </td>
              <td>
                <p className="text-center">V76.-</p>
              </td>
              <td>
                <p className="text-center">V77.-</p>
              </td>
              <td>
                <p className="text-center">V78.-</p>
              </td>
              <td>
                <p className="text-center">V79.-</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>- по­воз­ке, за­пря­жен­ной живот­ным (или вер­хом)</p>
              </td>
              <td>
                <p className="text-center">V80.1</p>
              </td>
              <td>
                <p className="text-center">V80.2</p>
              </td>
              <td>
                <p className="text-center">V80.3</p>
              </td>
              <td>
                <p className="text-center">V80.4</p>
              </td>
              <td>
                <p className="text-center">V80.4</p>
              </td>
              <td>
                <p className="text-center">V80.5</p>
              </td>
              <td>
                <p className="text-center">V80.6</p>
              </td>
              <td>
                <p className="text-center">V80.7</p>
              </td>
              <td>
                <p className="text-center">V80.8</p>
              </td>
              <td>
                <p className="text-center">V80.0</p>
              </td>
              <td>
                <p className="text-center">V80.9</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
