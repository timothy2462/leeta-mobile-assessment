import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from '@/lib/tailwind';
import { Colors } from '@/lib/design-system';

interface Review {
  phone: string;
  date: string;
  rating: number;
  comment: string;
}

interface ReviewsSectionProps {
  reviews: Review[];
}

export function ReviewsSection({ reviews }: ReviewsSectionProps) {
  return (
    <View>
      {/* Global Rating Card */}
      <View
        style={tw`bg-[#101010] rounded-3xl p-6 items-center justify-center mb-6`}
      >
        <Text style={tw`text-white text-[34px] font-bold mb-2`}>4.0</Text>
        <View style={tw`flex-row gap-1 mb-2`}>
          <Ionicons name="star" size={16} color={Colors.warning.DEFAULT} />
          <Ionicons name="star" size={16} color={Colors.warning.DEFAULT} />
          <Ionicons name="star" size={16} color={Colors.warning.DEFAULT} />
          <Ionicons name="star" size={16} color={Colors.warning.DEFAULT} />
          <Ionicons name="star-outline" size={16} color={Colors.warning.DEFAULT} />
        </View>
        <Text style={tw`text-white/60 text-[13px]`}>(22 reviews)</Text>
      </View>

      <Text style={tw`text-base font-bold text-neutral-900 mb-4`}>Reviews</Text>

      <View style={tw`bg-white rounded-3xl p-4 shadow-sm pb-2 mb-10`}>
        {reviews.map((rev, idx) => (
          <View key={idx} style={tw`mb-4`}>
            <View style={tw`flex-row justify-between items-start mb-2`}>
              <View>
                <Text style={tw`text-sm font-bold text-neutral-900 mb-0.5`}>
                  {rev.phone}
                </Text>
                <Text style={tw`text-xs text-neutral-400`}>{rev.date}</Text>
              </View>
              <View style={tw`flex-row gap-0.5`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Ionicons
                    key={i}
                    name={i < rev.rating ? 'star' : 'star-outline'}
                    size={12}
                    color={Colors.warning.DEFAULT}
                  />
                ))}
              </View>
            </View>
            <Text style={tw`text-sm text-neutral-600 leading-5 mt-1`}>
              {rev.comment}
            </Text>

            {idx !== reviews.length - 1 && (
              <View style={tw`h-px bg-neutral-100 mt-5`} />
            )}
          </View>
        ))}
      </View>
    </View>
  );
}
