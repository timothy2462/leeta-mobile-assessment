import { Colors, Shadows } from "@/lib/design-system";
import tw from "@/lib/tailwind";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { LineChart } from "react-native-gifted-charts";

interface InsightsChartProps {
  data: any[];
}

export function InsightsChart({ data }: InsightsChartProps) {
  return (
    <View style={[tw`bg-white rounded-3xl pt-5 pb-8 px-4 mb-10`, Shadows.sm]}>
      <View style={tw`flex-row items-center justify-between mb-8 px-1`}>
        <Text style={tw`text-sm font-semibold text-neutral-900`}>Refills</Text>
        <View style={tw`flex-row items-center`}>
          <Text style={tw`text-sm text-neutral-600 mr-1`}>Last 7 days</Text>
          <Ionicons name="chevron-down" size={14} color={Colors.neutral[600]} />
        </View>
      </View>

      <LineChart
        curved
        data={data}
        height={200}
        hideDataPoints={false}
        dataPointsColor={Colors.brand.DEFAULT}
        dataPointsRadius={4}
        spacing={44}
        thickness={2.5}
        color={Colors.brand.DEFAULT}
        initialSpacing={15}
        noOfSections={4}
        maxValue={40}
        yAxisColor="lightgray"
        yAxisThickness={1}
        xAxisColor="lightgray"
        xAxisThickness={1}
        rulesType="solid"
        rulesColor="rgba(0,0,0,0.05)"
        yAxisTextStyle={tw`text-xs text-neutral-500`}
        xAxisLabelTextStyle={tw`text-xs text-neutral-500`}
        pointerConfig={{
          pointerStripHeight: 180,
          pointerStripColor: Colors.brand.DEFAULT,
          pointerStripWidth: 1.5,
          pointerColor: Colors.brand.DEFAULT,
          radius: 6,
          pointerLabelWidth: 105,
          pointerLabelHeight: 90,
          activatePointersOnLongPress: false,
          pointerVanishDelay: 3000,
          autoAdjustPointerLabelPosition: true,
          pointerLabelComponent: (items: any) => {
            const item = items[0];
            return (
              <View
                style={[
                  tw`bg-[#FEF6EF] rounded-xl p-3 shadow-sm border border-brand/10 w-[105px]`,
                  { marginLeft: -42, marginTop: -20 },
                ]}
              >
                <Text style={tw`text-xs font-bold text-neutral-900 mb-2`}>
                  {item.day || "Day"}
                </Text>
                <View style={tw`flex-row justify-between w-full mb-1`}>
                  <Text style={tw`text-[10px] text-neutral-500`}>
                    Today's order
                  </Text>
                  <Text style={tw`text-[10px] font-bold text-neutral-900`}>
                    {item.order || item.value}
                  </Text>
                </View>
                <View style={tw`flex-row justify-between w-full`}>
                  <Text style={tw`text-[10px] text-neutral-500`}>Earnings</Text>
                  <Text style={tw`text-[10px] font-bold text-success`}>
                    {item.earnings || "₦0"}
                  </Text>
                </View>
              </View>
            );
          },
        }}
      />
    </View>
  );
}
