<script src="./comp-footer.js"></script>
<style lang="scss" src="./TheFooter.scss"></style>

<template>
  <!-- <BaseFooter style="display:none">
    <div class="footer">
      <div id="footer" class="container">
        <div class="row text-uppercase">
          <FooterLinks/>
          <FooterMarketing/>
        </div>
      </div>
    </div>
  </BaseFooter> -->

  <footer class="footer-area border-top-2 pt-50">
    <div class="footer-top">
      <div class="custom-container">
        <div class="row">
          <div
            v-for="(dataItem, key) in data"
            :key="key"
            class="footer-column"
            :class="'footer-column-' + (key + 1)"
          >
            <div
              v-if="
                dataItem.sys.contentType.sys.id == 'compFooterLogoContainer'
              "
              class="footer-widget footer-about-2 mb-30"
            >
              <div class="footer-logo">
                <a href="index.html"
                  ><img
                    :src="dataItem.fields.logo.fields.image.fields.file.url"
                    alt="logo"
                /></a>
              </div>
              <div class="footer-info">
                <ul>
                  <li
                    v-for="(currentItem, key) in data[0].fields.link"
                    :key="key"
                  >
                    <a :href="currentItem.fields.url">{{
                      currentItem.fields.text
                    }}</a>
                  </li>
                  <li>{{ data[0].fields.text }}</li>
                </ul>
              </div>
              <!-- <div class="footer-map">
                <a href="contact-us.html">Google maps</a>
              </div> -->
            </div>
            <div
              v-if="dataItem.sys.contentType.sys.id == 'compFooterNavLink'"
              class="footer-widget mb-30"
            >
              <div class="widget-title">
                <h3>{{ dataItem.fields.title }}</h3>
              </div>
              <div class="footer-list">
                <ul>
                  <li
                    v-for="(currentItem, key) in dataItem.fields.navLink"
                    :key="key"
                  >
                    <a :href="currentItem.fields.url">{{
                      currentItem.fields.text
                    }}</a>
                  </li>
                </ul>
              </div>
            </div>
            <div
              v-if="dataItem.sys.contentType.sys.id == 'compJoinNewsLetter'"
              class="footer-widget subscribe-right mb-30"
            >
              <div class="widget-title">
                <h3>{{ dataItem.fields.title }}</h3>
              </div>
              <div id="mc_embed_signup" class="subscribe-form-2 mt-20">
                <form class="validate subscribe-form-style" novalidate="">
                  <div id="mc_embed_signup_scroll" class="mc-form-2">
                    <input
                      class="email"
                      type="email"
                      required=""
                      :placeholder="dataItem.fields.inputPlaceholder"
                      name="EMAIL"
                      value=""
                    />
                    <div class="mc-news-2" aria-hidden="true">
                      <input
                        type="text"
                        value=""
                        tabindex="-1"
                        name="b_6bbb9b6f5827bd842d9640c82_05d85f18ef"
                      />
                    </div>
                    <div class="clear-2">
                      <input
                        class="button"
                        type="submit"
                        name="subscribe"
                        :value="dataItem.fields.submiText"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <!-- <div class="footer-column footer-column-3">
            <div class="footer-widget mb-30">
              <div class="widget-title">
                <h3>{{ data[2].fields.title }}</h3>
              </div>
              <div class="footer-list">
                <ul>
                  <li
                    v-for="(currentItem, key) in data[2].fields.navLink"
                    :key="key"
                  >
                    <a :href="currentItem.fields.url">{{
                      currentItem.fields.text
                    }}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="footer-column footer-column-4">
            <div class="footer-widget mb-30">
              <div class="widget-title">
                <h3>{{ data[3].fields.title }}</h3>
              </div>
              <div class="footer-list">
                <ul>
                  <li
                    v-for="(currentItem, key) in data[3].fields.navLink"
                    :key="key"
                  >
                    <a :href="currentItem.fields.url">{{
                      currentItem.fields.text
                    }}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="footer-column footer-column-5">
            <div class="footer-widget mb-30">
              <div class="widget-title">
                <h3>{{ data[4].fields.title }}</h3>
              </div>
              <div class="footer-list">
                <ul>
                  <li
                    v-for="(currentItem, key) in data[4].fields.navLink"
                    :key="key"
                  >
                    <a :href="currentItem.fields.url">{{
                      currentItem.fields.text
                    }}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </footer>
</template>
