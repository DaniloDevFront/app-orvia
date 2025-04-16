import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Card, Container } from "@shared/components";
import { colors, spacing, typography } from "@themes/theme";
import { useAuthStore } from "@state/stores";

export const ProfileScreen: React.FC = () => {
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Text style={styles.title}>Perfil</Text>

      <Card>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user?.name?.[0]?.toUpperCase() || "U"}</Text>
          </View>
          <Text style={styles.name}>{user?.name || "Usuário"}</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>
      </Card>

      <Card>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Conta</Text>
          <Text style={styles.menuArrow}>→</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Notificações</Text>
          <Text style={styles.menuArrow}>→</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Ajuda</Text>
          <Text style={styles.menuArrow}>→</Text>
        </TouchableOpacity>
      </Card>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  title: {
    ...typography.title,
    marginBottom: spacing.xl,
  },
  avatarContainer: {
    alignItems: "center",
    padding: spacing.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
  },
  avatarText: {
    color: colors.background,
    fontSize: 32,
    fontWeight: "bold",
  },
  name: {
    ...typography.subtitle,
    marginBottom: spacing.xs,
  },
  email: {
    ...typography.body,
    color: colors.textSecondary,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuText: {
    ...typography.body,
  },
  menuArrow: {
    color: colors.textSecondary,
    fontSize: 18,
  },
  logoutButton: {
    backgroundColor: colors.error + "20",
    padding: spacing.md,
    borderRadius: 8,
    alignItems: "center",
    marginTop: spacing.xl,
  },
  logoutText: {
    color: colors.error,
    ...typography.body,
    fontWeight: "600",
  },
});
