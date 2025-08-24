import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import api from '../services/api';
import { style } from './style';

interface Item {
  id: number;
  name: string;
  quantity: number;
  photo_id?: number;    
  created_at?: string;  
}

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await api.get<Item[]>('/items/last');
      let data = res.data;

      if (data.length > 0 && data[0].photo_id) {
        const lastPhotoId = Math.max(...data.map(i => i.photo_id!));
        data = data.filter(i => i.photo_id === lastPhotoId);
      }

      const grouped = Object.values(
        data.reduce((acc: Record<string, Item>, item) => {
          if (!acc[item.name]) {
            acc[item.name] = { ...item };
          } else {
            acc[item.name].quantity += item.quantity;
          }
          return acc;
        }, {})
      );

      setItems(grouped);
    } catch (err) {
      console.log('Erro ao buscar itens:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <View style={style.container}>
   
      <FlatList
        style={style.listContainer}
        data={items}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        renderItem={({ item }) => (
          <View style={style.item}>
            <Text style={style.text}>
              {item.name} - {item.quantity}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={style.text}>Nenhum item encontrado.</Text>
        }
      />

      
      <TouchableOpacity style={style.button} onPress={fetchItems}>
        <Text style={style.buttonText}>
          {loading ? 'Carregando...' : 'Atualizar'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
