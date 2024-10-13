import React, { useEffect, useRef } from "react";
import { useHistory } from "@docusaurus/router";
import styles from "./index.module.scss";
import Layout from "@theme/Layout";
import LogoSvg from "@site/static/img/logo.svg";
import SearchkeySvg from "@site/static/img/search-key.svg";
import RightArrSvg from "@site/static/img/right-arr.svg";
import egPng from "@site/static/img/eg.gif";
import { apps, navs, goods, shows } from "../utils/home";
import { DocSearch } from "@docsearch/react";
import YesSvg from "@site/static/img/yes.svg";
import WhousePng from '@site/static/img/whouse.png'

export default function Homepage() {
  const router = useHistory();
  const docSearchRef = useRef();
  useEffect(() => {
    const navbar = document.querySelector(".navbar");
    navbar.style.display = "none";
  }, []);
  const onStart = (path) => {
    if (path.indexOf("http") > -1) {
      window.open(path);
    } else {
      router.push(path);
    }
  };

  const onNavbar = (item) => {
    if (item.title === "搜索") {
      docSearchRef.current.querySelector("button").click();
    } else {
      onStart(item.path);
    }
  };
  return (
    <Layout>
      <main>
        <div className={styles.HomePage}>
          <div className={styles.navbar}>
            <div className={styles.logo}>
              <LogoSvg />
              {/* <div className={styles.version}>2.0 BETA</div> */}
            </div>
            <div className={styles.other}>
              <div ref={docSearchRef} style={{ display: "none" }}>
                <DocSearch appId="OE0YZ9O2TX" indexName="tiptap" apiKey="fcaabd624ef0e209b633935f37377fca" />
              </div>

              {navs.map((item, index) => (
                <div key={index} onClick={() => onNavbar(item)}>
                  <item.logo width={item.width} />
                  {item.title}
                  {item.title === "搜索" && (
                    <kbd className={styles.searchkey} disable>
                      <SearchkeySvg />K
                    </kbd>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className={styles.content}>
            <h1 className={styles.pageTitle}>献给网页开发人员的无头编辑器</h1>
            <div className={styles.desc}>
              Tiptap是一款用于web的无头富文本编辑器，它给你开放最大的控制权限，拥有大量扩展，你可以去定制化。
              同时它也是开源的，提供丰富的文档。加入我们的社区，开始创造美好的事物！
            </div>
            <div className={styles.apps}>
              {apps.map((item, index) => (
                <a key={index} onClick={() => onStart(item.path)}>
                  <span>
                    <img src={item.logo} />
                    {item.title}
                  </span>
                  <RightArrSvg />
                </a>
              ))}
            </div>
            <div className={styles.eg}>
              <img src={egPng}></img>
            </div>

            <div className={styles.collabBeta}>
              <h3>
                Tiptap Collab <div className={styles.version}> BETA</div>{" "}
              </h3>
              <div className={styles.collabBetaContent}>
                <div className={styles.left}>
                  <div>系好安全带!</div>
                  <div>协作编辑 的托管方案 已为您准备就绪啦！</div>
                  <a target="_blank" href="https://tiptap.dev/pricing">
                    <div className={styles.logout}>
                      注册Tiptap专业版即可拥有 <RightArrSvg />
                    </div>
                  </a>
                </div>
                <div className={styles.right}>
                  <div>通过 协助功能 来为您的编辑器赋能 </div>
                  <div className={styles.rightItem}>
                   <span><YesSvg/></span> 一切都可以实时操作
                  </div>
                  <div className={styles.rightItem}>
                   <span><YesSvg/></span> 无冲突&支持离线
                  </div>
                  <div className={styles.rightItem}>
                   <span><YesSvg/></span> 官方团队维护
                  </div>
                  
                </div>
              </div>
            </div>

            <div className={styles.whouse}>
              <img src={WhousePng} />
              <div>将有很多开发者与你同行，这些团队或公司也都在用Tiptap！</div>
            </div>

            <div className={styles.goodsbox}>
              <h1>非常的优秀！</h1>
              <div className={styles.goods}>
                {goods.map((item, index) => (
                  <div className={styles.good} key={index}>
                    <div className={styles.title}>
                      <div className={styles.icon}>
                        <item.logo />
                      </div>
                      {item.title}
                    </div>
                    <div className={styles.desc}>{item.desc}</div>
                    <div className={styles.try}>
                      {item.actionDesc} <RightArrSvg />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.showsbox}>
              <h1>都有谁在用？</h1>
              <div className={styles.shows}>
                {shows.map((item, index) => (
                  <div className={styles.show} key={index}>
                    <div>
                      <div className={styles.imgWrapp}>
                        <img src={item.logo} style={{ height: item.height }}></img>
                      </div>

                      <div>{item.title}</div>
                    </div>
                  </div>
                ))}
              </div>
              <a target="_blank" href="https://github.com/ueberdosis/tiptap/network/dependents?package_id=UGFja2FnZS0xMzE5OTg0ODc%3D">
                <div className={styles.verticalCenter}>
                  还有更多
                  <RightArrSvg />
                </div>
              </a>

              <div className={styles.license}>
                <h1>许可证</h1>
                <div>放心吧，你可以随便用，Tiptap是麻省理工学院授权的。如果您是Tiptap Pro Extensions的用户，他们也会有自己的许可证。</div>
              </div>
            </div>
          </div>
          <div className={styles.footer}>
            <div>
              本站为
              <a href="http://dingshaohua.cn/" target="_blank">
                丁少华
              </a>
              翻译版本，与官网保持同步
            </div>
            <div>
              <a href="https://beian.miit.gov.cn" target="_blank">
                京ICP备2021029278号-4
              </a>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
