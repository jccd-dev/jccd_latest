"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

const Footer = () => {
  const [timeState, setTimeState] = useState({
    timeStr: "",
    isAvailable: false,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      const phDate = new Date(
        new Date().toLocaleString("en-US", { timeZone: "Asia/Manila" }),
      );
      const hour = phDate.getHours();
      const isAvailable = hour >= 8 && hour < 17;

      const timeStr = phDate.toLocaleTimeString("en-US", {
        hour12: true,
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
      });

      setTimeState({
        timeStr: `${timeStr} PH`,
        isAvailable,
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full">
      <div className="h-10" />
      <div className="container mx-auto px-4 lg:px-6">
        <motion.div
          className="bg-foreground/[0.03] dark:bg-accent/10 border border-black/5 dark:border-white/5 rounded-sm p-6 md:p-10 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Top Row: Copyright and Links */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-pp-neue-montreal tracking-tight text-muted-foreground border-b border-black/5 dark:border-white/5 pb-8 mb-10">
            <div className="flex items-center gap-1 group cursor-default">
              <span>&copy; {new Date().getFullYear()}</span>
              <span className="text-foreground font-medium transition-colors group-hover:text-primary">
                John Carlo.
              </span>
              <span>All Rights Reserved.</span>
            </div>

          </div>

          {/* Middle Content */}
          <div className="grid md:grid-cols-2 gap-10 text-xs font-pp-neue-montreal tracking-tighter">
            {/* Left: Availability */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  {!mounted || timeState.isAvailable ? (
                    <>
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </>
                  ) : (
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-neutral-500"></span>
                  )}
                </span>
                <span className="text-foreground uppercase font-medium">
                  {timeState.isAvailable ? "(Online)" : "(Offline)"} Now,{" "}
                  {mounted ? timeState.timeStr : "--:--:--"}
                </span>
              </div>
              <div className="text-muted-foreground leading-relaxed font-light">
                <p>Mon to Fri, 8AM - 4PM</p>
                <p>Sat, 10AM - 2PM</p>
                <p>Sundays & Bank Holidays, Closed</p>
              </div>
            </div>

            {/* Right: Location */}
            <div className="flex flex-col md:items-end md:text-right gap-2 font-light">
              <p className="text-muted-foreground leading-relaxed">
                Based in{" "}
                <span className="text-foreground font-normal">
                  Legazpi City, Bicol
                </span>
                ,<br />
                <span className="text-foreground font-normal">
                  Philippines, SE Asia
                </span>
              </p>
              <p className="text-muted-foreground font-mono text-[10px] mt-2 opacity-60">
                13.1391° N, 123.7438° E
              </p>
            </div>
          </div>

          {/* Bottom Large SVG */}
          <motion.div
            className="mt-20 w-full overflow-hidden select-none touch-none"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {/* <svg
              viewBox="0 0 711.336 111.761"
              className="w-full h-auto fill-foreground opacity-[0.08] dark:opacity-[0.12] transition-opacity duration-700 hover:opacity-100 cursor-help"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g strokeLinecap="round" fillRule="evenodd">
                <path
                  d="M 66.036 75.907 C 66.036 94.357 58.836 111.757 33.036 111.757 C 7.236 111.757 0.036 94.357 0.036 75.907 L 0.036 70.957 L 16.986 70.957 L 16.986 75.907 C 16.986 87.907 19.086 96.457 32.586 96.457 C 45.936 96.457 48.336 87.907 48.336 75.907 L 48.336 2.257 L 66.036 2.257 L 66.036 75.907 Z"
                  id="0"
                />
                <path
                  d="M 157.836 39.157 C 155.886 28.357 148.836 15.307 129.036 15.307 C 105.936 15.307 96.786 34.657 96.786 55.807 C 96.786 77.107 105.936 96.457 129.036 96.457 C 148.986 96.457 156.636 83.407 157.836 70.357 L 175.686 70.357 C 173.286 94.507 156.786 111.757 129.486 111.757 C 98.586 111.757 79.086 88.207 79.086 55.807 C 79.086 23.557 98.586 0.007 129.486 0.007 C 156.636 0.007 173.136 17.257 175.686 39.157 L 157.836 39.157 Z"
                  id="1"
                />
                <path
                  d="M 263.586 39.157 C 261.636 28.357 254.586 15.307 234.786 15.307 C 211.686 15.307 202.536 34.657 202.536 55.807 C 202.536 77.107 211.686 96.457 234.786 96.457 C 254.736 96.457 262.386 83.407 263.586 70.357 L 281.436 70.357 C 279.036 94.507 262.536 111.757 235.236 111.757 C 204.336 111.757 184.836 88.207 184.836 55.807 C 184.836 23.557 204.336 0.007 235.236 0.007 C 262.386 0.007 278.886 17.257 281.436 39.157 L 263.586 39.157 Z"
                  id="2"
                />
                <path
                  d="M 294.636 109.507 L 294.636 2.257 L 336.336 2.257 C 365.886 2.257 384.036 21.457 384.036 55.957 C 384.036 90.457 366.486 109.507 336.786 109.507 L 294.636 109.507 Z M 312.486 17.407 L 335.436 17.407 C 359.436 17.407 366.186 35.407 366.186 55.957 C 366.186 76.507 359.436 94.357 335.436 94.357 L 312.486 94.357 L 312.486 17.407 Z"
                  id="3"
                />
                <path
                  d="M 404.886 110.707 C 399.336 110.707 395.136 106.957 395.136 100.957 C 395.136 95.107 399.336 91.207 404.886 91.207 C 410.286 91.207 414.486 95.107 414.486 100.957 C 414.486 106.957 410.286 110.707 404.886 110.707 Z"
                  id="4"
                />
                <path
                  d="M 429.786 109.507 L 429.786 2.257 L 471.486 2.257 C 501.036 2.257 519.186 21.457 519.186 55.957 C 519.186 90.457 501.636 109.507 471.936 109.507 L 429.786 109.507 Z M 447.636 17.407 L 470.586 17.407 C 494.586 17.407 501.336 35.407 501.336 55.957 C 501.336 76.507 494.586 94.357 470.586 94.357 L 447.636 94.357 L 447.636 17.407 Z"
                  id="5"
                />
                <path
                  d="M 551.286 46.507 L 603.636 46.507 L 603.636 61.807 L 551.286 61.807 L 551.286 94.357 L 612.486 94.357 L 612.486 109.507 L 533.436 109.507 L 533.436 2.257 L 610.986 2.257 L 610.986 17.407 L 551.286 17.407 L 551.286 46.507 Z"
                  id="6"
                />
                <path
                  d="M 618.786 2.257 L 637.686 2.257 L 664.986 90.007 L 665.136 90.007 L 692.436 2.257 L 711.336 2.257 L 674.736 109.507 L 655.386 109.507 L 618.786 2.257 Z"
                  id="7"
                />
              </g>
            </svg> */}
            <svg
              className="w-full h-auto fill-foreground opacity-[0.08] dark:opacity-[0.12] transition-opacity duration-700 hover:opacity-100 cursor-help"
              viewBox="-2 14 398.72 64.32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g
                id="svgGroup"
                strokeLinecap="round"
                fillRule="nonzero"
                strokeWidth="0.5"
              >
                <g id="line-0">
                  <path
                    id="char-0-0"
                    d="M18.080 76.320Q9.200 76.320 5.320 71.040Q1.440 65.760 1.440 57.760L1.440 57.760L1.440 56.160L8.640 56.160L8.640 57.760Q8.640 61.680 9.320 64.280Q10 66.880 12.080 68.400Q14.160 69.920 18.080 69.920L18.080 69.920Q23.840 69.920 25.720 66.840Q27.600 63.760 27.600 57.760L27.600 57.760L27.600 18.000L34.800 18.000L34.800 57.760Q34.800 65.760 30.880 71.040Q26.960 76.320 18.080 76.320L18.080 76.320Z"
                  />
                  <path
                    id="char-0-1"
                    d="M68.420 76.320Q60.660 76.320 54.660 72.480Q48.660 68.640 45.300 61.880Q41.940 55.120 41.940 46.560L41.940 46.560Q41.940 38.000 45.300 31.240Q48.660 24.480 54.660 20.680Q60.660 16.880 68.420 16.880L68.420 16.880Q75.220 16.880 80.500 19.560Q85.780 22.240 88.900 26.800Q92.020 31.360 92.740 36.880L92.740 36.880L85.220 36.880Q84.180 31.520 80.300 27.400Q76.420 23.280 68.420 23.280L68.420 23.280Q61.940 23.280 57.700 26.560Q53.460 29.840 51.460 35.120Q49.460 40.400 49.460 46.560L49.460 46.560Q49.460 52.720 51.460 58.040Q53.460 63.360 57.700 66.640Q61.940 69.920 68.420 69.920L68.420 69.920Q76.660 69.920 80.740 65.400Q84.820 60.880 85.220 54.560L85.220 54.560L92.740 54.560Q92.100 60.880 88.980 65.840Q85.860 70.800 80.580 73.560Q75.300 76.320 68.420 76.320L68.420 76.320Z"
                  />
                  <path
                    id="char-0-2"
                    d="M123.160 76.320Q115.400 76.320 109.400 72.480Q103.400 68.640 100.040 61.880Q96.680 55.120 96.680 46.560L96.680 46.560Q96.680 38.000 100.040 31.240Q103.400 24.480 109.400 20.680Q115.400 16.880 123.160 16.880L123.160 16.880Q129.960 16.880 135.240 19.560Q140.520 22.240 143.640 26.800Q146.760 31.360 147.480 36.880L147.480 36.880L139.960 36.880Q138.920 31.520 135.040 27.400Q131.160 23.280 123.160 23.280L123.160 23.280Q116.680 23.280 112.440 26.560Q108.200 29.840 106.200 35.120Q104.200 40.400 104.200 46.560L104.200 46.560Q104.200 52.720 106.200 58.040Q108.200 63.360 112.440 66.640Q116.680 69.920 123.160 69.920L123.160 69.920Q131.400 69.920 135.480 65.400Q139.560 60.880 139.960 54.560L139.960 54.560L147.480 54.560Q146.840 60.880 143.720 65.840Q140.600 70.800 135.320 73.560Q130.040 76.320 123.160 76.320L123.160 76.320Z"
                  />
                  <path
                    id="char-0-3"
                    d="M154.300 75.200L154.300 18.000L175.020 18.000Q182.940 18.000 188.660 21.320Q194.380 24.640 197.420 31.080Q200.460 37.520 200.460 46.640L200.460 46.640Q200.460 60.320 193.700 67.760Q186.940 75.200 175.020 75.200L175.020 75.200L154.300 75.200ZM161.500 68.800L175.020 68.800Q192.940 68.800 192.940 46.640L192.940 46.640Q192.940 24.400 175.020 24.400L175.020 24.400L161.500 24.400L161.500 68.800Z"
                  />
                  <path
                    id="char-0-4"
                    d="M208.080 75.200L208.080 18.000L215.280 18.000L215.280 68.800L245.280 68.800L245.280 75.200L208.080 75.200Z"
                  />
                  <path
                    id="char-0-5"
                    d="M245.540 75.200L266.660 18.000L274.740 18.000L296.020 75.200L288.260 75.200L283.220 60.880L258.020 60.880L252.980 75.200L245.540 75.200ZM260.420 54.480L280.900 54.480L270.740 24.640L270.580 24.640L260.420 54.480Z"
                  />
                  <path
                    id="char-0-6"
                    d="M300.920 75.200L300.920 18.000L323.960 18.000Q332.680 18.000 337.680 21.880Q342.680 25.760 342.680 32.400L342.680 32.400Q342.680 41.200 333.800 44.240L333.800 44.240L333.800 44.400Q338.680 45.200 341.800 48.840Q344.920 52.480 344.920 58.560L344.920 58.560Q344.920 66.400 339.720 70.800Q334.520 75.200 325.560 75.200L325.560 75.200L300.920 75.200ZM308.120 68.800L325.960 68.800Q337.400 68.800 337.400 58.560L337.400 58.560Q337.400 53.920 334.720 51.120Q332.040 48.320 327.560 48.320L327.560 48.320L308.120 48.320L308.120 68.800ZM308.120 41.920L324.760 41.920Q330.520 41.920 332.840 39.680Q335.160 37.440 335.160 33.200L335.160 33.200Q335.160 29.120 332.760 26.760Q330.360 24.400 325.560 24.400L325.560 24.400L308.120 24.400L308.120 41.920Z"
                  />
                  <path
                    id="char-0-7"
                    d="M373.340 76.320Q366.220 76.320 360.700 73.880Q355.180 71.440 351.940 66.880Q348.700 62.320 348.300 56.000L348.300 56.000L355.820 56.000Q357.260 70.000 373.020 70.000L373.020 70.000Q380.220 70.000 383.220 67.240Q386.220 64.480 386.220 59.600L386.220 59.600Q386.220 55.920 384.620 53.920Q383.020 51.920 380.140 50.840Q377.260 49.760 371.180 48.240L371.180 48.240Q370.620 48.160 369.500 47.840L369.500 47.840Q363.660 46.400 359.860 44.880Q356.060 43.360 353.380 40.240Q350.700 37.120 350.700 32.000L350.700 32.000Q350.700 25.040 355.820 20.960Q360.940 16.880 370.060 16.880L370.060 16.880Q379.740 16.880 385.460 21.600Q391.180 26.320 391.900 34.960L391.900 34.960L384.380 34.960Q383.580 29.040 380.220 26.120Q376.860 23.200 370.140 23.200L370.140 23.200Q364.220 23.200 361.220 25.360Q358.220 27.520 358.220 31.680L358.220 31.680Q358.220 35.040 360.100 36.960Q361.980 38.880 364.700 39.840Q367.420 40.800 372.460 42.000L372.460 42.000Q379.660 43.680 383.900 45.320Q388.140 46.960 390.940 50.320Q393.740 53.680 393.740 59.360L393.740 59.360Q393.740 66.880 388.620 71.600Q383.500 76.320 373.340 76.320L373.340 76.320Z"
                  />
                </g>
              </g>
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
