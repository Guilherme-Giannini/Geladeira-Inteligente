import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity } from 'react-native';
import api from '../services/api';
import { style } from './style';

interface Item {
  id: number;
  name: string;
  quantity: number;
  min_quantity: number;
  photo_id?: number;
}

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [toBuy, setToBuy] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [minInputs, setMinInputs] = useState<Record<number, string>>({});

  const fetchItems = async () => {
    try {
      
      const res = await api.get<Item[]>('/items/last');
      setItems(res.data);

      
      const resToBuy = await api.get<Item[]>('/items/tobuy');
      setToBuy(resToBuy.data);
    } catch (err) {
      console.log('Erro ao buscar itens:', err);
    }
  };

  const updateAllMinQuantities = async () => {
    const entries = Object.entries(minInputs);
    for (const [id, value] of entries) {
      const numValue = Number(value);
      if (!isNaN(numValue)) {
        try {
          await api.put(`/items/${id}/min`, { min_quantity: numValue });
        } catch (err) {
          console.log(`Erro ao atualizar mínimo do item ${id}:`, err);
        }
      }
    }
    setMinInputs({});
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await updateAllMinQuantities();
      await fetchItems(); 
    } finally {
      setLoading(false);
    }
  };

  const renderItem = (item: Item) => (
    <View style={style.item}>
      <Text style={style.text}>
        {item.name} - {item.quantity} (mínimo: {item.min_quantity})
      </Text>
      <TextInput
        style={style.input}
        keyboardType="number-pad"
        placeholder="Novo mínimo"
        value={minInputs[item.id] || ''}
        onChangeText={(text) => setMinInputs((prev) => ({ ...prev, [item.id]: text }))}
      />
    </View>
  );

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <View style={style.container}>
      <Text style={style.title}>O que tem na geladeira</Text>
      <FlatList
        style={style.listContainer}
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => renderItem(item)}
        ListEmptyComponent={<Text style={style.text}>Nenhum item encontrado.</Text>}
      />

      <Text style={style.title}>O que precisa comprar</Text>
      <FlatList
        style={style.listContainer}
        data={toBuy}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const amountToBuy = Math.max(item.min_quantity - item.quantity, 0);
          if (amountToBuy === 0) return null; 
          return (
            <View style={style.item}>
              <Text style={style.text}>
                {item.name} - precisa comprar: {amountToBuy}
              </Text>
            </View>
          );
        }}
        ListEmptyComponent={<Text style={style.text}>Nada para comprar!</Text>}
      />

      <TouchableOpacity style={style.button} onPress={handleUpdate}>
        <Text style={style.buttonText}>{loading ? 'Carregando...' : 'Atualizar'}</Text>
      </TouchableOpacity>
    </View>
  );
}