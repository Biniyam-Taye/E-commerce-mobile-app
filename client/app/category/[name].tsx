import { View, Text, ScrollView } from "react-native";
import React, { useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import Header from "@/components/Header";
import { dummyProducts } from "@/assets/assets";
import ProductCard from "@/components/ProductCard";
import FiltersSheet, { FiltersState } from "@/components/FiltersSheet";

function normalizeCategory(value: string) {
  const v = value.trim().toLowerCase();
  if (v === "bags" || v === "bag") return "bag";
  return v;
}

export default function CategoryScreen() {
  const params = useLocalSearchParams<{ name?: string }>();
  const rawName = typeof params.name === "string" ? params.name : "All";
  const selectedName = rawName?.length ? rawName : "All";
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
    const base =
      selectedName.toLowerCase() === "all"
        ? dummyProducts
        : dummyProducts.filter((p) => normalizeCategory(String(p.category)) === normalizeCategory(selectedName));

    const q = query.trim().toLowerCase();
    let list = q ? base.filter((p: any) => String(p.name).toLowerCase().includes(q)) : base.slice();

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
  }, [selectedName, query, appliedFilters]);

  return (
    <SafeAreaView className="flex-1" edges={["top"]}>
      <Header
        title={selectedName}
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

        {products.length === 0 ? (
          <View className="bg-surface border border-border rounded-2xl p-6">
            <Text className="text-primary font-bold text-base">No products found</Text>
            <Text className="text-secondary mt-2">
              Try another category or check back later.
            </Text>
          </View>
        ) : (
          <View className="flex-row flex-wrap justify-between">
            {products.map((product: any) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </View>
        )}

        <View className="h-8" />
      </ScrollView>

      <FiltersSheet
        visible={filtersOpen}
        title="Filters"
        showCategory={false}
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

