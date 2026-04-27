import { View, ScrollView, Text } from "react-native";
import React, { useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import { dummyProducts } from "@/assets/assets";
import ProductCard from "@/components/ProductCard";
import FiltersSheet, { FiltersState } from "@/components/FiltersSheet";

export default function Shop() {
  const [query, setQuery] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [draftFilters, setDraftFilters] = useState<FiltersState>({
    sort: "newest",
    category: "All",
    minPrice: "",
    maxPrice: "",
  });
  const [appliedFilters, setAppliedFilters] = useState<FiltersState>(draftFilters);

  const products = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = dummyProducts.slice();

    if (q) {
      list = list.filter((p: any) => String(p.name).toLowerCase().includes(q));
    }

    if (appliedFilters.category !== "All") {
      const target = appliedFilters.category.trim().toLowerCase();
      list = list.filter((p: any) => String(p.category).trim().toLowerCase() === target);
    }

    const min = appliedFilters.minPrice ? Number(appliedFilters.minPrice) : undefined;
    const max = appliedFilters.maxPrice ? Number(appliedFilters.maxPrice) : undefined;

    if (min !== undefined && !Number.isNaN(min)) list = list.filter((p: any) => Number(p.price) >= min);
    if (max !== undefined && !Number.isNaN(max)) list = list.filter((p: any) => Number(p.price) <= max);

    if (appliedFilters.sort === "price_asc") {
      list.sort((a: any, b: any) => Number(a.price) - Number(b.price));
    } else if (appliedFilters.sort === "price_desc") {
      list.sort((a: any, b: any) => Number(b.price) - Number(a.price));
    } else {
      list.sort((a: any, b: any) => Date.parse(String(b.createdAt)) - Date.parse(String(a.createdAt)));
    }

    return list;
  }, [query, appliedFilters]);

  return (
    <SafeAreaView className="flex-1" edges={["top"]}>
      <Header
        title="Shop"
        showBack
        showCart
        showSearchBar
        searchValue={query}
        onSearchChangeText={setQuery}
        onFilterPress={() => setFiltersOpen(true)}
      />

      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        <View className="mt-3 mb-5">
          <Text className="text-secondary">
            {products.length} {products.length === 1 ? "item" : "items"}
          </Text>
        </View>

        <View className="flex-row flex-wrap justify-between">
          {products.map((product: any) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </View>

        <View className="h-8" />
      </ScrollView>

      <FiltersSheet
        visible={filtersOpen}
        value={draftFilters}
        onChange={setDraftFilters}
        onClose={() => setFiltersOpen(false)}
        onReset={() => {
          const next: FiltersState = { sort: "newest", category: "All", minPrice: "", maxPrice: "" };
          setDraftFilters(next);
          setAppliedFilters(next);
          setFiltersOpen(false);
        }}
        onApply={() => {
          setAppliedFilters(draftFilters);
          setFiltersOpen(false);
        }}
      />
    </SafeAreaView>
  );
}

