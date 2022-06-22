const { gql } = require("apollo-server");

const typeDefs = gql`
  type AboutUsPage {
    name: String
    header: HeaderDetails
    image_with_text_slider: [CarouselDetails]
    banner: AboutBannerDetails
    paragraph: AboutParagraphDetails
    banner2: AboutBannerDetails
    footer: [FooterDetails]
  }
  type AboutBannerDetails {
    sys: SystemDetails
    fields: AboutBannerInfoData
  }
  type AboutParagraphDetails {
    sys: SystemDetails
    fields: AboutParagraphData
  }
  type AboutBannerInfoData {
    text: String
    image: ImageData
  }
  type AboutParagraphData {
    text: TextData
    title: String
  }
  type TextData {
    nodeType: String
    content: [TextContent]
  }
  type TextContent {
    nodeType: String
    content: [TextDetails]
  }
  type TextDetails {
    value: String
    nodeType: String
    marks: [TypeValue]
  }
  type TypeValue {
    type: String
  }
  type CategoriesData {
    categories: Category
  }
  type Category {
    results: [Result]
  }
  type Result {
    children: [Child1]
    id: String
    externalId: String
    name: String
    slug: String
    orderHint: String
  }
  type Child1 {
    children: [MenuCategoryInfo]
    id: String
    externalId: String
    name: String
    slug: String
    orderHint: String
  }
  type MenuCategoryInfo {
    id: String
    externalId: String
    name: String
    slug: String
    orderHint: String
  }
  type HomePage {
    name: String
    header: HeaderDetails
    image_with_text_slider: [CarouselDetails]
    home_service_gallery_view: [GalleryDetails]
    home_service_gallery_view2: [GalleryDetails]
    service_card: [ServiceCardDetails]
    footer: [FooterDetails]
    componentOrder:[String]
  }
  type HeaderDetails {
    sys: SystemDetails
    fields: HeaderInfoData
  }
  type HeaderInfoData {
    isCategoryDataEnabled: String
    websiteLogo: HeaderLogoData
    categories: CategoriesData
    topHeader: TopHeaderData
    searchLink: SearchLinkData
    signInLink: SignInLinkData
    cartLink: SearchLinkData
    shoppingListLink: SignInLinkData
  }
  type TopHeaderData {
    sys: SystemDetails
    fields: TopHeaderDetails
  }
  type TopHeaderDetails {
    helpLink: TopHeaderNavTextDetails
    storeLink: TopHeaderNavTextDetails
    location: TopHeaderNavListDetails
    language: TopHeaderNavListDetails
  }
  type TopHeaderNavTextDetails {
    sys: SystemDetails
    fields: SignInLinkDetails
  }
  type TopHeaderNavListDetails {
    sys: SystemDetails
    fields: TopHeaderNavTextLists
  }
  type TopHeaderNavTextLists {
    title: String
    listItem: [TopHeaderNavTextListDetails]
  }
  type TopHeaderNavTextListDetails {
    sys: SystemDetails
    fields: SignInLinkDetails
  }
  type SearchLinkData {
    sys: SystemDetails
    fields: SearchLinkText
  }
  type SearchLinkText {
    text: String
  }
  type SignInLinkData {
    sys: SystemDetails
    fields: SignInLinkDetails
  }
  type SignInLinkDetails {
    iconClass: String
    text: String
    url: String
  }
  type HeaderLogoData {
    sys: SystemDetails
    fields: HeaderLogoImage
  }
  type HeaderLogoImage {
    image: HeaderLogoImageInfo
    url: String
  }
  type HeaderLogoImageInfo {
    fields: HeaderLogoUrl
  }
  type HeaderLogoUrl {
    title: String
    file: ImageFile
  }
  type ServiceCardDetails {
    sys: SystemDetails
    fields: ServiceCardData
  }
  type ServiceCardData {
    title: String
    description: String
    iconClass: String
  }
  type FooterDetails {
    sys: SystemDetails
    fields: FooterData
  }
  type FooterData {
    text: String
    logo: LogoDetails
    link: [LinkDetails]
    navLink: [NavLinkDetails]
    title: String
    submiText: String
    inputPlaceholder: String
  }
  type NavLinkDetails {
    sys: SystemDetails
    fields: LinkData
  }
  type LinkDetails {
    sys: SystemDetails
    fields: LinkData
  }
  type LogoDetails {
    sys: SystemDetails
    fields: LogoData
  }
  type LogoData {
    url: String
    image: FooterImageInfo
  }
  type FooterImageInfo {
    fields: FooterImage
  }
  type FooterImage {
    title: String
    file: ImageFile
  }
  type LinkData {
    url: String
    text: String
  }
  type CarouselDetails {
    sys: SystemDetails
    fields: CarouselData
  }
  type SystemDetails {
    id: String
    contentType: ContentTypeDetails
  }
  type CarouselData {
    imageText: String
    sliderImage: ImageData
  }
  type ContentTypeDetails {
    sys: ContentData
  }
  type ContentData {
    linkType: String
    id: String
  }
  type ImageData {
    fields: ImageInfo
  }
  type ImageInfo {
    title: String
    file: ImageFile
  }
  type ImageFile {
    fileName: String
    url: String
    contentType: String
  }
  type GalleryDetails {
    fields: GalleryInfoData
    sys: SystemDetails
  }
  type GalleryInfoData {
    title: String
    box: [BannerData]
  }
  type BannerData {
    sys: SystemDetails
    fields: BannerDetails
  }
  type BannerDetails {
    text: String
    image: BannerImageData
  }
  type BannerImageData {
    fields: ImageFileData
  }
  type ImageFileData {
    title: String
    file: ImagePathData
  }
  type ImagePathData {
    url: String
    fileName: String
    contentType: String
  }
  type PDPData {
    header: HeaderDetails
    product_info: String
    footer: [FooterDetails]
  }
  type PLPData {
    header: HeaderDetails
    breadcrumb: String
    product_list: String
  }
  type ProductDetails {
    id: String
    version: String
  }
  type Query {
    hello: String
    getHomePageData: HomePage
    getAboutUsData: AboutUsPage
    getAboutUsContentStackData: AboutUsPage
    getPDPData(
      priceCurrency: String
      productId: String
      priceCountry: String
    ): PDPData
    getPLPData(url: String, categoryId: String): PLPData
    getOnlyPLPData(url: String, categoryId: String): String
  }
`;

module.exports = typeDefs;
