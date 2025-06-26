<?php

function timestampToDate($timestamp): string {
    if (!is_numeric($timestamp) || $timestamp < 0) {
        return "Invalid timestamp";
    }
    
    return date(format: "d-m-Y", timestamp: $timestamp);
}

function trueOrFalse($value): string {
    return $value ? "Ja" : "Nee";
}

/**
 * validate if a UUID follows the proper v4 format
 * This helps detect tampering with UUID values
 */
function isValidUuid($uuid): bool {
    $pattern = "/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i";
    return preg_match($pattern, $uuid) === 1;
}

/**
 * generate a secure hash for data integrity verification
 * This can be used to detect tampering with critical data
 */
function generateDataHash($data, $secret_key = "your_secret_key_here"): string {
    return hash_hmac("sha256", serialize($data), $secret_key);
}

/**
 * verify data integrity using the hash
 * This helps detect if data has been tampered with
 */
function verifyDataHash($data, $hash, $secret_key = "your_secret_key_here"): bool {
    $expected_hash = hash_hmac("sha256", serialize($data), $secret_key);
    return hash_equals($expected_hash, $hash);
}

/**
 * format a date string to a more readable format
 */
function formatDate($date_string): string {
    try {
        $date = new DateTime($date_string);
        return $date->format("d-m-Y H:i");
    } catch (Exception $e) {
        return "Invalid date";
    }
}
