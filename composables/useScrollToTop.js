import { ref, onMounted, onUnmounted } from "vue";

export function useScrollToTop (threshold = 300) {
  const isVisible = ref(false);

  const checkVisibility = () => {
    const scrollable =
      document.documentElement.scrollHeight > window.innerHeight;

    if (!scrollable) {
      isVisible.value = false;
      return;
    }

    isVisible.value = window.scrollY > threshold;
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  onMounted(() => {
    checkVisibility();
    window.addEventListener("scroll", checkVisibility);
    window.addEventListener("resize", checkVisibility);
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", checkVisibility);
    window.removeEventListener("resize", checkVisibility);
  });

  return { isVisible, scrollToTop };
}