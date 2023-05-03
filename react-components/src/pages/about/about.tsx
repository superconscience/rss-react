import { FC } from 'react';
import { Container } from '../../components/ui/container/container';

export const About: FC = () => (
  <div data-testid="about-page">
    <Container>
      <h3>ロレム・イプサムとは？</h3>
      <p>
        Lorem Ipsum は、印刷および植字業界の単なるダミー テキストです。 Lorem Ipsum は、1500
        年代に未知の印刷業者がタイプのギャレーを取り、それをスクランブルしてタイプ見本帳を作成して以来、業界の標準的なダミー
        テキストでした。 それは 5
        世紀だけでなく、電子組版への飛躍にも耐え、本質的に変わっていません。 1960 年代に Lorem Ipsum
        のパッセージを含む Letraset シートがリリースされ、最近では Lorem Ipsum のバージョンを含む
        Aldus PageMaker のようなデスクトップ パブリッシング ソフトウェアで普及しました。
      </p>
      <h3>それはどこから来たのですか？</h3>
      <p>
        一般に信じられていることとは反対に、Lorem Ipsum は単なるランダム テキストではありません。
        紀元前 45 年の古典ラテン文学にルーツがあり、2000 年以上前のものです。
        バージニア州ハンプデン・シドニー・カレッジのラテン語教授であるリチャード・マクリントックは、ロレム・イプサムのパッセージから、よりあいまいなラテン語の
        1 つである consectetur
        を調べ、古典文学の単語の引用を調べて、疑いの余地のない情報源を発見しました。 Lorem Ipsum
        は、紀元前 45 年に書かれたキケロの &quot;de Finibus Bonorum et Malorum&quot; (善と悪の極限)
        のセクション 1.10.32 と 1.10.33 に由来します。
        この本は、ルネッサンス期に非常に人気のあった倫理理論に関する論文です。 Lorem Ipsum
        の最初の行「Lorem ipsum dolor sit amet..」は、セクション 1.10.32 の行から来ています。
      </p>
      <p>
        興味のある方のために、1500 年代から使用されている Lorem Ipsum
        の標準的なチャンクを以下に示します。 Cicero による &quot;de Finibus Bonorum et Malorum&quot;
        のセクション 1.10.32 および 1.10.33 も、H. Rackham による 1914
        年の翻訳の英語版を伴って、正確な元の形式で複製されます。
      </p>
    </Container>
  </div>
);
