import { View, Text, TouchableOpacity } from 'react-native';
import tw from '@/lib/tailwind';
import { Colors } from '@/lib/design-system';
import { OrderFilter } from '@/shared/types/order';

interface FilterTabsProps {
  filter: OrderFilter;
  onFilterChange: (filter: OrderFilter) => void;
  counts?: Partial<Record<OrderFilter, number>>;
}

const TABS: { key: OrderFilter; label: string }[] = [
  { key: 'pending', label: 'New' },
  { key: 'in_transit', label: 'Accepted' },
  { key: 'delivered', label: 'Completed' },
];

export function FilterTabs({ filter, onFilterChange, counts }: FilterTabsProps) {
  return (
    <View style={tw`mx-5 mb-4`}>
      <View style={tw`flex-row bg-neutral-100 rounded-xl p-1`}>
        {TABS.map((tab) => {
          const isActive = filter === tab.key;
          const count = counts?.[tab.key];

          return (
            <TouchableOpacity
              key={tab.key}
              style={[
                tw`flex-1 py-2.5 rounded-lg items-center justify-center`,
                isActive && { backgroundColor: Colors.white },
                isActive && {
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.08,
                  shadowRadius: 4,
                  elevation: 2,
                },
              ]}
              onPress={() => onFilterChange(tab.key)}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
              accessibilityLabel={`${tab.label} orders tab`}
            >
              <Text
                style={tw`text-sm font-${isActive ? 'semibold' : 'medium'} text-${isActive ? 'neutral-900' : 'neutral-500'}`}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
