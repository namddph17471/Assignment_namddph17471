import Header from "../components/header";
import Footer from "../components/footer";

const AboutPage = {
    render() {
        return /* html */`
            <div id ="header"> 
                ${Header.render()}
            </div>
            <div class="max-w-5xl">
                <div class="relative bg-white overflow-hidden">
                    <div class="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
                        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:static">
                            <div class="sm:max-w-lg">
                              <h1 class="text-4xl font font-extrabold tracking-tight text-gray-900 sm:text-6xl">Summer styles are finally here</h1>
                              <p class="mt-4 text-xl text-gray-500">This year, our new summer collection will shelter you from the harsh elements of a world that doesn't care if you live or die.</p>
                            </div>
                            <div>
                                <div class="mt-10">
                                  <!-- Decorative image grid -->
                                    <div aria-hidden="true" class="pointer-events-none lg:absolute lg:inset-y-0 lg:max-w-7xl lg:mx-auto lg:w-full">
                                        <div class="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                                            <div class="flex items-center space-x-6 lg:space-x-8">
                                                <div class="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                                                  <div class="w-44 h-64 rounded-lg overflow-hidden sm:opacity-0 lg:opacity-100">
                                                    <img src="https://res.cloudinary.com/namddph17471/image/upload/v1645070831/a0vbbtycnz9ystqrgapx.jpg" alt="" class="w-full h-full object-center object-cover">
                                                  </div>
                                                  <div class="w-44 h-64 rounded-lg overflow-hidden">
                                                    <img src="https://res.cloudinary.com/namddph17471/image/upload/v1645021551/t%E1%BA%A3i_xu%E1%BB%91ng_dbsko1.jpg" alt="" class="w-full h-full object-center object-cover">
                                                  </div>
                                                </div>
                                                <div class="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                                                  <div class="w-44 h-64 rounded-lg overflow-hidden">
                                                    <img src="https://res.cloudinary.com/namddph17471/image/upload/v1645021551/t%E1%BA%A3i_xu%E1%BB%91ng_dbsko1.jpg" alt="" class="w-full h-full object-center object-cover">
                                                  </div>
                                                  <div class="w-44 h-64 rounded-lg overflow-hidden">
                                                    <img src="https://res.cloudinary.com/namddph17471/image/upload/v1645070801/ofx2seepn8pwjokscfvf.jpg" alt="" class="w-full h-full object-center object-cover">
                                                  </div>
                                                  <div class="w-44 h-64 rounded-lg overflow-hidden">
                                                    <img src="https://res.cloudinary.com/namddph17471/image/upload/v1645070680/jz6wpnrrhtdcjtlku7rs.jpg" alt="" class="w-full h-full object-center object-cover">
                                                  </div>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                    <a href="/#/products" class="inline-block text-center bg-indigo-600 border border-transparent rounded-md py-3 px-8 font-medium text-white hover:bg-indigo-700">Shop Collection</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        ${Footer.render()}`;
    },
    afterRender() {
        Header.afterRender();
    },
};
export default AboutPage;