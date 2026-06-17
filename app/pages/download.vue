<script setup lang="ts">
type ReleaseAsset = {
  name: string
  browser_download_url: string
}

type Release = {
  tag_name: string
  html_url: string
  assets: ReleaseAsset[]
}

useSeoMeta({
  title: 'Download — QxChat',
  description: 'Download the latest version of QxChat for Windows, Linux, macOS and Android.',
  ogType: 'website'
})

const linuxFormat = ref<'AppImage' | '.deb' | '.rpm'>('AppImage')

const linuxFormats = [
  { label: 'AppImage' as const, matcher: /\.AppImage$/i },
  { label: '.deb' as const, matcher: /\.deb$/i },
  { label: '.rpm' as const, matcher: /\.rpm$/i },
]

const otherPlatforms = [
  { name: 'Windows', matcher: /windows|win|\.exe|\.msi/i },
  { name: 'macOS', matcher: /macos|darwin|\.dmg|\.pkg/i },
  { name: 'Android', matcher: /android|\.apk|\.aab/i },
]

const { data: latestRelease } = await useFetch<Release>('https://api.github.com/repos/lqxp/app/releases/latest', {
  key: 'lqxp-app-latest-release',
  default: () => ({ tag_name: '', html_url: 'https://github.com/lqxp/app/releases', assets: [] })
})

const linuxAsset = computed(() => {
  const assets = latestRelease.value?.assets ?? []
  const fmt = linuxFormats.find(f => f.label === linuxFormat.value)!
  const asset = assets.find(a => fmt.matcher.test(a.name))
  return {
    file: asset?.name ?? 'Browse releases',
    url: asset?.browser_download_url ?? 'https://github.com/lqxp/app/releases',
  }
})

const downloads = computed(() => {
  const assets = latestRelease.value?.assets ?? []
  return otherPlatforms.map((platform) => {
    const asset = assets.find((item) => platform.matcher.test(item.name))
    return {
      name: platform.name,
      assetName: asset?.name ?? 'Browse releases',
      url: asset?.browser_download_url ?? 'https://github.com/lqxp/app/releases'
    }
  })
})
</script>

<template>
  <section class="page-hero container">
    <p class="eyebrow">Download</p>
    <h1>Get the latest version.</h1>
    <p class="lead">
      Links are fetched automatically from the
      <a href="https://github.com/lqxp/app/releases" target="_blank" rel="noreferrer">GitHub Releases</a>
      of the lqxp/app repository.
    </p>
    <p v-if="latestRelease?.tag_name" class="release-tag">{{ latestRelease.tag_name }}</p>
  </section>

  <section class="download-grid container">

    <!-- ── Linux card (with format selector) ───────────────────── -->
    <a class="download-card" :href="linuxAsset.url" target="_blank" rel="noreferrer">
      <span class="download-card__icon" aria-hidden="true">
        <svg viewBox="-19.5 0 295 295" version="1.1" xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" fill="#000000">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <defs>
              <filter x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox" id="filter-1">
                <feOffset dx="0" dy="0" in="SourceAlpha" result="shadowOffsetOuter1"> </feOffset>
                <feGaussianBlur stdDeviation="6.5" in="shadowOffsetOuter1" result="shadowBlurOuter1">
                </feGaussianBlur>
              </filter>
              <linearGradient x1="48.5477412%" y1="115.276174%" x2="51.0473804%" y2="41.3637237%" id="linearGradient-2">
                <stop stop-color="#FFEED7" offset="0%"> </stop>
                <stop stop-color="#BDBFC2" offset="100%"> </stop>
              </linearGradient>
              <linearGradient x1="54.4065463%" y1="2.40410545%" x2="46.1753957%" y2="90.5422349%" id="linearGradient-3">
                <stop stop-color="#FFFFFF" stop-opacity="0.8" offset="0%"> </stop>
                <stop stop-color="#FFFFFF" stop-opacity="0" offset="100%"> </stop>
              </linearGradient>
              <linearGradient x1="51.859653%" y1="88.2477484%" x2="47.9469396%" y2="9.74782136%" id="linearGradient-4">
                <stop stop-color="#FFEED7" offset="0%"> </stop>
                <stop stop-color="#BDBFC2" offset="100%"> </stop>
              </linearGradient>
              <linearGradient x1="49.9251097%" y1="85.4900173%" x2="49.9236843%" y2="13.8109272%" id="linearGradient-5">
                <stop stop-color="#FFEED7" offset="0%"> </stop>
                <stop stop-color="#BDBFC2" offset="100%"> </stop>
              </linearGradient>
              <linearGradient x1="53.9014071%" y1="3.10177585%" x2="45.9555354%" y2="93.8949571%" id="linearGradient-6">
                <stop stop-color="#FFFFFF" stop-opacity="0.65" offset="0%"> </stop>
                <stop stop-color="#FFFFFF" stop-opacity="0" offset="100%"> </stop>
              </linearGradient>
              <linearGradient x1="45.5928761%" y1="5.47459052%" x2="54.811359%" y2="93.5235162%" id="linearGradient-7">
                <stop stop-color="#FFFFFF" stop-opacity="0.65" offset="0%"> </stop>
                <stop stop-color="#FFFFFF" stop-opacity="0" offset="100%"> </stop>
              </linearGradient>
              <linearGradient x1="49.9844987%" y1="89.8452442%" x2="49.9844987%" y2="40.6316864%" id="linearGradient-8">
                <stop stop-color="#FFEED7" offset="0%"> </stop>
                <stop stop-color="#BDBFC2" offset="100%"> </stop>
              </linearGradient>
              <linearGradient x1="53.5047131%" y1="99.97524%" x2="42.7455968%" y2="23.5451715%" id="linearGradient-9">
                <stop stop-color="#FFEED7" offset="0%"> </stop>
                <stop stop-color="#BDBFC2" offset="100%"> </stop>
              </linearGradient>
              <linearGradient x1="49.8413363%" y1="13.2289558%" x2="50.2412612%" y2="94.6729694%"
                id="linearGradient-10">
                <stop stop-color="#FFFFFF" stop-opacity="0.8" offset="0%"> </stop>
                <stop stop-color="#FFFFFF" stop-opacity="0" offset="100%"> </stop>
              </linearGradient>
              <linearGradient x1="49.9272298%" y1="37.3270337%" x2="50.7270446%" y2="92.7824735%"
                id="linearGradient-11">
                <stop stop-color="#FFFFFF" stop-opacity="0.65" offset="0%"> </stop>
                <stop stop-color="#FFFFFF" stop-opacity="0" offset="100%"> </stop>
              </linearGradient>
              <linearGradient x1="49.8755597%" y1="2.29900584%" x2="49.8755597%" y2="81.203617%" id="linearGradient-12">
                <stop stop-color="#FFFFFF" stop-opacity="0.65" offset="0%"> </stop>
                <stop stop-color="#FFFFFF" stop-opacity="0" offset="100%"> </stop>
              </linearGradient>
              <linearGradient x1="49.8334391%" y1="2.27189065%" x2="49.8240398%" y2="71.7989617%"
                id="linearGradient-13">
                <stop stop-color="#FFFFFF" stop-opacity="0.65" offset="0%"> </stop>
                <stop stop-color="#FFFFFF" stop-opacity="0" offset="100%"> </stop>
              </linearGradient>
              <linearGradient x1="53.4670683%" y1="48.9213861%" x2="38.9488708%" y2="98.0999776%"
                id="linearGradient-14">
                <stop stop-color="#FFA63F" offset="0%"> </stop>
                <stop stop-color="#FFFF00" offset="100%"> </stop>
              </linearGradient>
              <linearGradient x1="52.3731508%" y1="143.008909%" x2="47.57909%" y2="-64.6215389%" id="linearGradient-15">
                <stop stop-color="#FFEED7" offset="0%"> </stop>
                <stop stop-color="#BDBFC2" offset="100%"> </stop>
              </linearGradient>
              <linearGradient x1="30.580815%" y1="34.0241079%" x2="65.8867024%" y2="89.175349%" id="linearGradient-16">
                <stop stop-color="#FFA63F" offset="0%"> </stop>
                <stop stop-color="#FFFF00" offset="100%"> </stop>
              </linearGradient>
              <linearGradient x1="59.5715091%" y1="-17.2155207%" x2="48.3608522%" y2="66.1184465%"
                id="linearGradient-17">
                <stop stop-color="#FFFFFF" stop-opacity="0.65" offset="0%"> </stop>
                <stop stop-color="#FFFFFF" stop-opacity="0" offset="100%"> </stop>
              </linearGradient>
              <linearGradient x1="47.7689553%" y1="1.56481301%" x2="51.3733028%" y2="104.312856%"
                id="linearGradient-18">
                <stop stop-color="#FFFFFF" stop-opacity="0.65" offset="0%"> </stop>
                <stop stop-color="#FFFFFF" stop-opacity="0" offset="100%"> </stop>
              </linearGradient>
              <linearGradient x1="43.5495626%" y1="4.5334861%" x2="57.1143288%" y2="92.8267174%" id="linearGradient-19">
                <stop stop-color="#FFFFFF" stop-opacity="0.65" offset="0%"> </stop>
                <stop stop-color="#FFFFFF" stop-opacity="0" offset="100%"> </stop>
              </linearGradient>
              <linearGradient x1="49.7328042%" y1="17.6085216%" x2="50.5582487%" y2="99.3854667%"
                id="linearGradient-20">
                <stop stop-color="#FFA63F" offset="0%"> </stop>
                <stop stop-color="#FFFF00" offset="100%"> </stop>
              </linearGradient>
              <linearGradient x1="50.1697217%" y1="2.89048531%" x2="49.6802359%" y2="94.1704279%"
                id="linearGradient-21">
                <stop stop-color="#FFFFFF" stop-opacity="0.65" offset="0%"> </stop>
                <stop stop-color="#FFFFFF" stop-opacity="0" offset="100%"> </stop>
              </linearGradient>
            </defs>
            <g fill="none">
              <g transform="translate(10.000000, 0.000000)">
                <path
                  d="M235.125423,249.358628 C235.125423,266.714271 182.507524,280.855905 117.584567,280.855905 C52.6616093,280.855905 0.0437105058,266.806099 0.0437105058,249.358628 L0.0437105058,249.358628 C0.0437105058,232.002986 52.6616093,217.861352 117.584567,217.861352 C182.507524,217.861352 235.033594,232.002986 235.125423,249.358628 L235.125423,249.358628 L235.125423,249.358628 Z"
                  fill="#000000" fill-opacity="0.2" filter="url(#filter-1)"> </path>
                <path
                  d="M53.2125821,215.473804 C41.8258117,199.128278 39.6219206,145.867578 66.160442,113.084699 C79.2919595,97.3819748 82.6896249,86.4543483 83.6997416,71.6699125 C84.434372,54.8652433 71.8538272,4.81855066 119.237485,1.05357012 C167.263944,-2.80323922 164.600909,44.5804184 164.325423,69.6496791 C164.141765,90.7703016 179.844489,102.799874 190.680286,119.329056 C210.607135,149.632558 208.954216,201.791313 186.915306,230.074582 C158.999353,265.428667 135.123866,250.093259 119.237485,251.378862 C89.4849556,253.123609 88.4748389,268.918162 53.2125821,215.473804 L53.2125821,215.473804 Z"
                  fill="#000000"> </path>
                <path
                  d="M169.10052,122.451235 C177.365111,130.073025 198.76122,164.141508 164.876395,185.445788 C152.938652,192.88392 175.528535,221.167189 186.364333,207.484699 C205.556551,182.874582 193.343321,143.571858 181.772893,129.522053 C174.059275,119.604543 162.121532,115.747734 169.10052,122.451235 L169.10052,122.451235 Z"
                  fill="url(#linearGradient-2)"> </path>
                <path
                  d="M166.8048,117.859796 C180.395461,128.879251 205.097407,167.447344 169.008691,192.608434 C157.162777,200.413881 179.477174,225.115827 192.057718,212.535282 C235.676395,168.641119 190.955773,118.227111 175.528535,100.871469 C161.754216,85.719718 149.540987,104.360963 166.8048,117.859796 L166.8048,117.859796 Z"
                  stroke="#000000" stroke-width="0.9773" fill="#000000"> </path>
                <path
                  d="M147.245267,25.0208853 C146.786123,37.60143 132.919975,48.5290565 116.298963,49.5391732 C99.6779518,50.54929 86.638263,40.9990954 87.097407,28.4185507 L87.097407,28.4185507 C87.556551,15.8380059 101.422699,4.91037946 118.043711,3.90026272 C134.664722,2.98197479 147.704411,12.4403405 147.245267,25.0208853 L147.245267,25.0208853 L147.245267,25.0208853 Z"
                  fill="url(#linearGradient-3)"> </path>
                <path
                  d="M107.483399,54.9570721 C107.942543,63.1298347 104.085734,70.0169942 98.7596638,70.2924806 C93.4335938,70.567967 88.7503253,64.2317802 88.2911813,56.0590176 L88.2911813,56.0590176 C87.8320374,47.8862549 91.6888467,40.9990954 97.0149167,40.723609 C102.340987,40.4481226 107.024255,46.7843094 107.483399,54.9570721 L107.483399,54.9570721 L107.483399,54.9570721 Z"
                  fill="url(#linearGradient-4)"> </path>
                <path
                  d="M117.125423,55.5998736 C117.30908,65.0582394 123.461609,72.5882005 130.807913,72.4045429 C138.154216,72.2208853 143.93943,64.4154378 143.755773,54.8652433 L143.755773,54.8652433 C143.572115,45.4068775 137.419586,37.8769164 130.073282,38.060574 C122.726979,38.2442316 116.849936,46.1415079 117.125423,55.5998736 L117.125423,55.5998736 L117.125423,55.5998736 Z"
                  fill="url(#linearGradient-5)"> </path>
                <path
                  d="M123.186123,57.7119359 C123.094294,62.9461771 125.6655,67.1703016 129.063166,67.1703016 C132.369002,67.1703016 135.215695,62.9461771 135.307524,57.8037647 L135.307524,57.8037647 C135.399353,52.5695234 132.828146,48.3453989 129.430481,48.3453989 C126.032816,48.3453989 123.277952,52.5695234 123.186123,57.7119359 L123.186123,57.7119359 L123.186123,57.7119359 Z"
                  fill="#000000"> </path>
                <path
                  d="M101.973672,57.8037647 C102.432816,62.119718 100.779897,65.7928697 98.3923486,66.1601849 C96.0048,66.4356713 93.7090802,63.2216635 93.2499362,58.9057102 L93.2499362,58.9057102 C92.7907922,54.5897569 94.4437105,50.9166051 96.8312591,50.54929 C99.2188078,50.2738036 101.514528,53.4878114 101.973672,57.8037647 L101.973672,57.8037647 L101.973672,57.8037647 Z"
                  fill="#000000"> </path>
                <path
                  d="M124.563555,54.7734145 C124.288068,57.7119359 125.6655,60.0994845 127.593905,60.2831421 C129.52231,60.4667997 131.358886,58.1710798 131.634372,55.3243872 L131.634372,55.3243872 C131.909858,52.3858658 130.532426,49.9983172 128.604022,49.8146596 C126.675617,49.631002 124.839041,51.9267219 124.563555,54.7734145 L124.563555,54.7734145 L124.563555,54.7734145 Z"
                  fill="url(#linearGradient-6)"> </path>
                <path
                  d="M99.9534381,55.5080448 C100.228925,57.8955935 99.2188078,60.0076557 97.7495471,60.1913133 C96.2802864,60.3749709 94.9028545,58.538395 94.6273681,56.0590176 L94.6273681,56.0590176 C94.3518817,53.6714689 95.3619984,51.5594067 96.8312591,51.3757491 C98.3005198,51.1920915 99.6779518,53.1204962 99.9534381,55.5080448 L99.9534381,55.5080448 L99.9534381,55.5080448 Z"
                  fill="url(#linearGradient-7)"> </path>
                <path
                  d="M71.0273681,145.68392 C77.5472125,130.899485 91.4133603,104.911936 91.6888467,84.80143 C91.6888467,68.8232199 139.531648,64.9664106 143.388458,80.9446207 C147.245267,96.9228308 156.979119,120.798317 163.223477,132.368745 C169.467835,143.847344 187.558107,180.487033 168.274061,212.443453 C150.918419,240.726722 98.3005198,263.132948 70.2009089,208.586644 C60.6507144,189.669913 62.3954615,166.25357 71.0273681,145.68392 L71.0273681,145.68392 Z"
                  fill="url(#linearGradient-8)"> </path>
                <path
                  d="M65.1503253,134.664465 C59.5487689,145.224776 47.9783409,172.957072 76.2616093,188.108823 C106.65694,204.270691 106.565111,237.420885 70.0172514,221.626333 C36.5915704,207.39287 51.3760062,149.724387 60.7425432,135.950068 C66.8032436,126.308045 75.986123,114.46213 65.1503253,134.664465 L65.1503253,134.664465 Z"
                  fill="url(#linearGradient-9)"> </path>
                <path
                  d="M69.9254226,122.726722 C61.0180296,137.235671 39.7137494,171.395983 68.2725043,189.210769 C106.65694,212.810769 95.8211424,236.31894 60.7425432,215.106488 C11.3386521,185.537617 54.7736716,125.848901 74.5168623,103.07536 C97.1067455,77.5469553 78.8328156,107.758628 69.9254226,122.726722 L69.9254226,122.726722 Z"
                  stroke="#000000" stroke-width="1.25" fill="#000000"> </path>
                <path
                  d="M156.428146,151.285477 C156.428146,167.447344 140.90908,188.384309 114.27873,188.200652 C86.8219206,188.384309 75.1596638,167.447344 75.1596638,151.285477 C75.1596638,135.123609 93.341765,121.992092 115.747991,121.992092 C138.246045,122.08392 156.428146,135.123609 156.428146,151.285477 L156.428146,151.285477 Z"
                  fill="url(#linearGradient-10)"> </path>
                <path
                  d="M141.919197,100.504154 C141.643711,117.216994 130.716084,121.165632 116.941765,121.165632 C103.167446,121.165632 93.1581074,118.686255 91.9643331,100.504154 C91.9643331,89.1173833 103.167446,82.5057102 116.941765,82.5057102 C130.716084,82.4138814 141.919197,89.0255546 141.919197,100.504154 L141.919197,100.504154 Z"
                  fill="url(#linearGradient-11)"> </path>
                <path
                  d="M58.6304809,126.216216 C67.6297027,112.533726 86.638263,91.504932 62.2118039,129.154737 C42.3767844,160.19287 54.8655004,180.119718 61.293516,185.629446 C79.8429323,202.158628 79.1083019,213.269913 64.5075237,204.546177 C33.1939051,185.904932 39.7137494,154.499485 58.6304809,126.216216 L58.6304809,126.216216 Z"
                  fill="url(#linearGradient-12)"> </path>
                <path
                  d="M188.935539,131.817772 C181.130092,115.747734 156.336318,74.9757491 190.129314,122.359407 C220.89196,165.243453 199.312193,195.087811 195.455384,198.026333 C191.598574,200.964854 178.650714,206.933726 182.415695,196.557072 C186.272504,186.180418 205.372893,166.529056 188.935539,131.817772 L188.935539,131.817772 Z"
                  fill="url(#linearGradient-13)"> </path>
                <path
                  d="M51.8351502,258.541508 C31.2655004,247.613881 1.42114241,260.65357 12.2569401,231.084699 C14.4608311,224.381197 9.0429323,214.280029 12.5324265,207.760185 C16.6647222,199.77108 25.5721152,201.515827 30.8981852,196.189757 C36.1324265,190.680029 39.438263,181.129835 49.263944,182.599095 C58.9977961,184.068356 65.5176405,196.006099 72.3129712,210.698706 C77.3635549,221.167189 95.1783409,235.951625 93.9845665,247.70571 C92.5153058,265.704154 72.0374848,269.101819 51.8351502,258.541508 L51.8351502,258.541508 Z"
                  stroke="#E68C3F" stroke-width="6.25" fill="url(#linearGradient-14)"> </path>
                <path
                  d="M201.607913,189.11894 C198.485734,194.995983 185.446045,204.454348 176.72231,201.974971 C167.906746,199.587422 163.866279,186.180418 165.611026,175.987422 C167.263944,164.600652 176.72231,163.95785 188.660053,169.651235 C201.516084,175.987422 205.372893,181.313492 201.607913,189.11894 L201.607913,189.11894 Z"
                  fill="url(#linearGradient-15)"> </path>
                <path
                  d="M194.445267,253.490924 C209.505189,235.216994 243.022699,238.981975 220.432816,213.912714 C215.657718,208.494815 217.126979,196.924387 211.249936,191.965632 C204.362777,185.904932 196.740987,190.863687 189.761998,187.741508 C182.78301,184.343842 175.436707,177.823998 166.896629,182.415438 C158.356551,187.098706 157.438263,199.220107 156.611804,215.198317 C155.877174,226.676916 145.408691,245.869134 151.010247,256.429446 C159.091181,272.774971 180.119975,270.57108 194.445267,253.490924 L194.445267,253.490924 Z"
                  stroke="#E68C3F" stroke-width="6.2507" fill="url(#linearGradient-16)"> </path>
                <path
                  d="M187.925423,229.064465 C211.249936,194.628667 193.894294,194.904154 188.017251,192.241119 C182.140209,189.486255 175.987679,184.068356 169.10052,187.833337 C162.21336,191.690146 161.846045,201.607656 161.662388,214.647344 C161.386901,224.013881 153.581454,239.716605 158.264722,248.440341 C163.958107,258.633337 177.732426,243.848901 187.925423,229.064465 L187.925423,229.064465 Z"
                  fill="url(#linearGradient-17)"> </path>
                <path
                  d="M47.0600529,234.02322 C12.1651113,211.433337 28.5106366,203.719718 33.7448778,200.138395 C40.0810646,195.546955 40.1728934,186.731391 47.9783409,187.55785 C55.7837883,188.384309 60.375228,198.026333 65.6094693,209.964076 C69.4662786,218.504154 82.8732825,229.890924 81.8631658,239.716605 C80.5775626,251.287033 62.1199751,243.665243 47.0600529,234.02322 L47.0600529,234.02322 Z"
                  fill="url(#linearGradient-18)"> </path>
                <path
                  d="M199.587679,188.843453 C196.832816,193.618551 185.629703,201.148512 178.19157,199.128278 C170.569781,197.199874 167.080286,186.455905 168.641376,178.374971 C170.018808,169.192092 178.19157,168.732948 188.476395,173.324387 C199.404022,178.283142 202.801687,182.507267 199.587679,188.843453 L199.587679,188.843453 Z"
                  fill="#000000"> </path>
                <path
                  d="M192.057718,186.180418 C190.312971,189.486255 182.966668,194.720496 177.824255,193.343064 C172.681843,191.965632 170.110637,184.5275 170.937096,178.925944 C171.671726,172.589757 177.181454,172.222442 184.160442,175.344621 C191.690403,178.834115 194.077952,181.772636 192.057718,186.180418 L192.057718,186.180418 Z"
                  fill="url(#linearGradient-19)"> </path>
                <path
                  d="M97.1067455,66.3438425 C100.779897,62.9461771 109.68729,52.5695234 126.583788,63.4053211 C129.705967,65.4255546 132.277174,65.6092121 138.246045,68.1804184 C150.275617,73.1391732 144.582232,85.0769164 131.726201,89.1173833 C126.216473,90.8621304 121.257718,97.5656324 111.340209,96.9228308 C102.800131,96.4636868 100.59624,90.8621304 95.3619984,87.8317802 C86.0872903,82.597539 84.7098584,75.5267219 89.760442,71.7617413 C94.8110257,67.9967608 96.7394304,66.6193289 97.1067455,66.3438425 L97.1067455,66.3438425 Z"
                  stroke="#E68C3F" stroke-width="3.75" fill="url(#linearGradient-20)"> </path>
                <path
                  d="M138.429703,75.9858658 C133.379119,76.2613522 122.451493,87.1889787 110.972893,87.1889787 C99.4942942,87.1889787 92.6071346,76.5368386 90.8623875,76.5368386"
                  stroke="#E68C3F" stroke-width="2.5"> </path>
                <path
                  d="M102.800131,65.4255546 C104.636707,63.7726363 110.421921,59.2730254 118.043711,63.8644651 C119.696629,64.782753 121.349547,65.7928697 123.737096,67.1703016 C128.604022,70.0169942 126.216473,74.14929 120.33943,76.7204962 C117.676395,77.8224417 113.268613,80.2099904 109.962777,80.0263328 C106.289625,79.6590176 103.810247,77.2714689 101.422699,75.7103795 C96.9230879,72.7718581 97.1985743,70.2924806 99.3106366,68.364076 C100.871726,66.8948153 102.616473,65.5173833 102.800131,65.4255546 L102.800131,65.4255546 Z"
                  fill="url(#linearGradient-21)"> </path>
              </g>
            </g>
          </g>
        </svg>
      </span>

      <span class="download-card__platform">Linux</span>

      <div class="format-pills" @click.stop>
        <button v-for="fmt in linuxFormats" :key="fmt.label" class="pill" :class="{ active: linuxFormat === fmt.label }"
          @click.prevent="linuxFormat = fmt.label">{{ fmt.label }}</button>
      </div>

      <span class="download-card__file">{{ linuxAsset.file }}</span>
      <span class="download-card__arrow" aria-hidden="true">↓</span>
    </a>

    <!-- ── Windows, macOS, Android cards ───────────────────────── -->
    <a v-for="item in downloads" :key="item.name" class="download-card" :href="item.url" target="_blank"
      rel="noreferrer">
      <span class="download-card__icon" aria-hidden="true">

        <!-- ── Windows ─────────────────────────────────────────────── -->
        <template v-if="item.name === 'Windows'">
          <svg viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <title>Windowsphone-color</title>
              <desc>Created with Sketch.</desc>
              <defs> </defs>
              <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="Color-" transform="translate(-400.000000, -560.000000)" fill="#00B6F0">
                  <path
                    d="M400,566.79594 L419.616154,564.132637 L419.624728,582.995574 L400.01826,583.106885 L400,566.79594 Z M419.606809,585.169154 L419.622035,604.048843 L400.01549,601.3615 L400.01439,585.042845 L419.606809,585.169154 Z M421.984711,563.784314 L447.993926,560 L447.993926,582.755916 L421.984711,582.961764 L421.984711,563.784314 Z M448,585.3466 L447.993899,608 L421.984683,604.340389 L421.94824,585.304384 L448,585.3466 Z"
                    id="Windowsphone"> </path>
                </g>
              </g>
            </g>
          </svg>
        </template>

        <!-- ── macOS ──────────────────────────────────────────────── -->
        <template v-else-if="item.name === 'macOS'">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <rect width="512" height="512" rx="15%" fill="url(#mac-a)" />
            <defs>
              <linearGradient id="mac-a" x2="0" y1="100%">
                <stop offset="0" stop-color="#1e73f2" />
                <stop offset="1" stop-color="#19d3fd" />
              </linearGradient>
              <linearGradient id="mac-b" x2="0" y1="100%">
                <stop offset="0" stop-color="#dbe9f4" />
                <stop offset="1" stop-color="#f7f6f6" />
              </linearGradient>
            </defs>
            <path fill="url(#mac-b)"
              d="M435.2 0H274.4c-21.2 49.2-59.2 129.6-60.8 283.4a9.9 9.9 0 0010 10.1h58.7a9.9 9.9 0 019.9 10.2A933.3 933.3 0 00311.3 512h123.9a76.8 76.8 0 0076.8-76.8V76.8A76.8 76.8 0 00435.2 0z" />
            <path fill="none" stroke="#000" stroke-linecap="round" stroke-width="20"
              d="M371 149v34m-229-34v34m263.4 147.2a215.2 215.2 0 01-298.8 0" />
          </svg>
        </template>

        <!-- ── Android ────────────────────────────────────────────── -->
        <template v-else-if="item.name === 'Android'">
          <svg viewBox="-3 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <title>Android-color</title>
              <desc>Created with Sketch.</desc>
              <defs> </defs>
              <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="Color-" transform="translate(-304.000000, -560.000000)" fill="#95CF00">
                  <path
                    d="M330.727009,569.600905 C329.935377,569.600905 329.294532,568.977195 329.294532,568.206729 C329.294532,567.436264 329.935377,566.815376 330.727009,566.815376 C331.518641,566.815376 332.159486,567.436264 332.159486,568.206729 C332.159486,568.977195 331.518641,569.600905 330.727009,569.600905 L330.727009,569.600905 Z M319.272991,569.600905 C318.481359,569.600905 317.840514,568.977195 317.840514,568.206729 C317.840514,567.436264 318.481359,566.815376 319.272991,566.815376 C320.064623,566.815376 320.705468,567.436264 320.705468,568.206729 C320.705468,568.977195 320.064623,569.600905 319.272991,569.600905 L319.272991,569.600905 Z M331.573737,564.018558 L332.107291,563.233981 L332.640845,562.460694 L333.829743,560.722208 C333.97763,560.507719 333.916736,560.219853 333.696355,560.078742 C333.478873,559.934809 333.180199,559.994075 333.038111,560.208564 L331.222867,562.852982 L330.677713,563.648847 C328.952361,562.996915 327.029826,562.632849 325,562.632849 C322.973074,562.632849 321.047639,562.996915 319.322287,563.648847 L318.780033,562.852982 L318.243579,562.071228 L316.967688,560.208564 C316.819801,559.994075 316.524027,559.937631 316.303645,560.078742 C316.086164,560.219853 316.025269,560.507719 316.170257,560.722208 L317.359155,562.460694 L317.892709,563.233981 L318.429163,564.018558 C314.37821,565.855822 311.637945,569.335616 311.637945,573.317766 L338.362055,573.317766 C338.362055,569.335616 335.62179,565.855822 331.573737,564.018558 Z M311.843828,575.174785 L311.637945,575.174785 L311.637945,595.613286 C311.637945,597.236061 312.992129,598.556859 314.662386,598.556859 L316.842999,598.556859 C316.767606,598.802392 316.727009,599.059214 316.727009,599.330147 L316.727009,605.214471 C316.727009,606.75258 318.011599,608 319.591964,608 C321.172328,608 322.456918,606.75258 322.456918,605.214471 L322.456918,599.330147 C322.456918,599.059214 322.413422,598.802392 322.340928,598.556859 L327.659072,598.556859 C327.586578,598.802392 327.545982,599.059214 327.545982,599.330147 L327.545982,605.214471 C327.545982,606.75258 328.827672,608 330.408036,608 C331.991301,608 333.275891,606.75258 333.275891,605.214471 L333.275891,599.330147 C333.275891,599.059214 333.232394,598.802392 333.157001,598.556859 L335.340514,598.556859 C337.010771,598.556859 338.362055,597.236061 338.362055,595.613286 L338.362055,575.174785 L311.843828,575.174785 Z M306.864954,575.174785 C305.28169,575.174785 304,576.422205 304,577.960314 L304,589.884184 C304,591.422293 305.28169,592.669713 306.864954,592.669713 C308.445319,592.669713 309.727009,591.422293 309.727009,589.884184 L309.727009,577.960314 C309.727009,576.422205 308.445319,575.174785 306.864954,575.174785 Z M343.137945,575.174785 C341.554681,575.174785 340.272991,576.422205 340.272991,577.960314 L340.272991,589.884184 C340.272991,591.422293 341.554681,592.669713 343.137945,592.669713 C344.71831,592.669713 346,591.422293 346,589.884184 L346,577.960314 C346,576.422205 344.71831,575.174785 343.137945,575.174785 Z"
                    id="Android"> </path>
                </g>
              </g>
            </g>
          </svg>
        </template>

      </span>

      <span class="download-card__platform">{{ item.name }}</span>
      <span class="download-card__file">{{ item.assetName }}</span>
      <span class="download-card__arrow" aria-hidden="true">↓</span>
    </a>

  </section>

  <section class="download-note container">
    <p>
      No build for your platform?
      <a href="https://github.com/lqxp/app" target="_blank" rel="noreferrer">Build QxChat yourself</a>,
      the code is open.
    </p>
  </section>
</template>

<style scoped>
.page-hero {
  padding: 56px 0 32px;
}

.page-hero h1 {
  font-size: clamp(2rem, 4vw, 2.8rem);
  margin-bottom: 14px;
  max-width: 600px;
}

.page-hero .lead a {
  color: var(--blue-700);
  font-weight: 600;
}

.release-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 18px;
  padding: 6px 12px;
  border-radius: var(--radius-sm);
  background: var(--cream);
  font-family: var(--font-mono);
  font-size: 0.82rem;
  color: var(--ink);
}

/* ── Download grid ────────────────────────────────────────────── */
.download-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  padding: 24px 0 48px;
}

.download-card {
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: #fff;
  transition: border-color 150ms ease, transform 150ms ease;
  text-decoration: none;
  color: inherit;
}

.download-card:hover {
  border-color: var(--blue-400);
  transform: translateY(-2px);
}

/* ── Platform icon ────────────────────────────────────────────── */
.download-card__icon {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 32px;
  height: 32px;
  color: var(--ink);
}

.download-card__icon svg {
  width: 100%;
  height: 100%;
}

/* ── Card text ────────────────────────────────────────────────── */
.download-card__platform {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1.05rem;
}

.download-card__file {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--slate);
}

.download-card__arrow {
  margin-top: auto;
  align-self: flex-end;
  color: var(--blue-700);
  font-size: 1.1rem;
}

/* ── Linux format pills ───────────────────────────────────────── */
.format-pills {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.pill {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  padding: 3px 10px;
  border-radius: 99px;
  border: 1px solid var(--line);
  background: transparent;
  color: var(--slate);
  cursor: pointer;
  transition: background 100ms, color 100ms, border-color 100ms;
  line-height: 1.6;
}

.pill:hover {
  border-color: var(--blue-400);
  color: var(--blue-700);
}

.pill.active {
  background: var(--blue-50, #e8f0fe);
  color: var(--blue-700);
  border-color: var(--blue-400);
  font-weight: 600;
}

/* ── Download note ────────────────────────────────────────────── */
.download-note {
  padding-bottom: 72px;
  color: var(--slate);
  font-size: 0.92rem;
}

.download-note a {
  color: var(--blue-700);
  font-weight: 600;
}

/* ── Responsive ───────────────────────────────────────────────── */
@media (max-width: 900px) {
  .download-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 560px) {
  .download-grid {
    grid-template-columns: 1fr;
  }
}
</style>