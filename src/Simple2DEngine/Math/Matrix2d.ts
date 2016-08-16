//Port of glMatrix, taken from: https://github.com/toji/gl-matrix
module Simple2DEngine {

    /* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE. */

    /**
     * @class 2x3 Matrix
     * @name Matrix2d
     * 
     * @description 
     * A Matrix2d contains six elements defined as:
     * <pre>
     * [a, c, tx,
     *  b, d, ty]
     * </pre>
     * This is a short form for the 3x3 matrix:
     * <pre>
     * [a, c, tx,
     *  b, d, ty,
     *  0, 0, 1]
     * </pre>
     * The last row is ignored so the array is shorter and operations are faster.
     */
    export class Matrix2d extends Float32Array {

        /**
         * Creates a new identity Matrix2d
         *
         * @returns {Matrix2d} a new 2x3 matrix
         */
        public static create() : Matrix2d {
            var a : any = new Float32Array(6);
            a[0] = 1;
            a[1] = 0;
            a[2] = 0;
            a[3] = 1;
            a[4] = 0;
            a[5] = 0;
            return a;
        }

        /**
         * Creates a new Matrix2d initialized with values from an existing matrix
         *
         * @param {Matrix2d} a matrix to clone
         * @returns {Matrix2d} a new 2x3 matrix
         */
        public static clone(a:Matrix2d): Matrix2d {
            var out = Matrix2d.create();
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            out[4] = a[4];
            out[5] = a[5];
            return out;
        }

        /**
         * Copy the values from one Matrix2d to another
         *
         * @param {Matrix2d} out the receiving matrix
         * @param {Matrix2d} a the source matrix
         * @returns {Matrix2d} out
         */
        public static copy(out: Matrix2d, a: Matrix2d): Matrix2d {
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            out[4] = a[4];
            out[5] = a[5];
            return out;
        }

        /**
         * Set a Matrix2d to the identity matrix
         *
         * @param {Matrix2d} out the receiving matrix
         * @returns {Matrix2d} out
         */
        public static identity(out: Matrix2d): Matrix2d {
            out[0] = 1;
            out[1] = 0;
            out[2] = 0;
            out[3] = 1;
            out[4] = 0;
            out[5] = 0;
            return out;
        }

        /**
         * Create a new Matrix2d with the given values
         *
         * @param {Number} a Component A (index 0)
         * @param {Number} b Component B (index 1)
         * @param {Number} c Component C (index 2)
         * @param {Number} d Component D (index 3)
         * @param {Number} tx Component TX (index 4)
         * @param {Number} ty Component TY (index 5)
         * @returns {Matrix2d} A new Matrix2d
         */
        public static fromValues(a: number, b: number, c: number, d: number, tx: number, ty: number): Matrix2d {
            var out = Matrix2d.create();
            out[0] = a;
            out[1] = b;
            out[2] = c;
            out[3] = d;
            out[4] = tx;
            out[5] = ty;
            return out;
        }

        /**
         * Set the components of a Matrix2d to the given values
         *
         * @param {Matrix2d} out the receiving matrix
         * @param {Number} a Component A (index 0)
         * @param {Number} b Component B (index 1)
         * @param {Number} c Component C (index 2)
         * @param {Number} d Component D (index 3)
         * @param {Number} tx Component TX (index 4)
         * @param {Number} ty Component TY (index 5)
         * @returns {Matrix2d} out
         */
        public static set(out: Matrix2d, a: number, b: number, c: number, d: number, tx: number, ty: number): Matrix2d {
            out[0] = a;
            out[1] = b;
            out[2] = c;
            out[3] = d;
            out[4] = tx;
            out[5] = ty;
            return out;
        }

        /**
         * Inverts a Matrix2d
         *
         * @param {Matrix2d} out the receiving matrix
         * @param {Matrix2d} a the source matrix
         * @returns {Matrix2d} out
         */
        public static invert(out: Matrix2d, a: Matrix2d): Matrix2d {
            var aa = a[0], ab = a[1], ac = a[2], ad = a[3],
                atx = a[4], aty = a[5];

            var det = aa * ad - ab * ac;
            if (!det) {
                return null;
            }
            det = 1.0 / det;

            out[0] = ad * det;
            out[1] = -ab * det;
            out[2] = -ac * det;
            out[3] = aa * det;
            out[4] = (ac * aty - ad * atx) * det;
            out[5] = (ab * atx - aa * aty) * det;
            return out;
        }

        /**
         * Calculates the determinant of a Matrix2d
         *
         * @param {Matrix2d} a the source matrix
         * @returns {Number} determinant of a
         */
        public static determinant(a: Matrix2d): number {
            return a[0] * a[3] - a[1] * a[2];
        }

        /**
         * Multiplies two Matrix2d's
         *
         * @param {Matrix2d} out the receiving matrix
         * @param {Matrix2d} a the first operand
         * @param {Matrix2d} b the second operand
         * @returns {Matrix2d} out
         */
        public static mul(out: Matrix2d, a: Matrix2d, b: Matrix2d): Matrix2d {
            var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
                b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5];
            out[0] = a0 * b0 + a2 * b1;
            out[1] = a1 * b0 + a3 * b1;
            out[2] = a0 * b2 + a2 * b3;
            out[3] = a1 * b2 + a3 * b3;
            out[4] = a0 * b4 + a2 * b5 + a4;
            out[5] = a1 * b4 + a3 * b5 + a5;
            return out;
        }

        /**
         * Rotates a Matrix2d by the given angle
         *
         * @param {Matrix2d} out the receiving matrix
         * @param {Matrix2d} a the matrix to rotate
         * @param {Number} rad the angle to rotate the matrix by
         * @returns {Matrix2d} out
         */
        public static rotate(out: Matrix2d, a: Matrix2d, rad: number): Matrix2d {
            var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
                s = Math.sin(rad),
                c = Math.cos(rad);
            out[0] = a0 * c + a2 * s;
            out[1] = a1 * c + a3 * s;
            out[2] = a0 * -s + a2 * c;
            out[3] = a1 * -s + a3 * c;
            out[4] = a4;
            out[5] = a5;
            return out;
        }

        /**
         * Scales the Matrix2d by the dimensions in the given Vector2
         *
         * @param {Matrix2d} out the receiving matrix
         * @param {Matrix2d} a the matrix to translate
         * @param {Vector2} v the Vector2 to scale the matrix by
         * @returns {Matrix2d} out
         **/
        public static scale(out: Matrix2d, a: Matrix2d, v: Vector2): Matrix2d {
            var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
                v0 = v[0], v1 = v[1];
            out[0] = a0 * v0;
            out[1] = a1 * v0;
            out[2] = a2 * v1;
            out[3] = a3 * v1;
            out[4] = a4;
            out[5] = a5;
            return out;
        }

        /**
         * Translates the Matrix2d by the dimensions in the given Vector2
         *
         * @param {Matrix2d} out the receiving matrix
         * @param {Matrix2d} a the matrix to translate
         * @param {Vector2} v the Vector2 to translate the matrix by
         * @returns {Matrix2d} out
         **/
        public static translate(out: Matrix2d, a: Matrix2d, v: Vector2): Matrix2d {
            var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
                v0 = v[0], v1 = v[1];
            out[0] = a0;
            out[1] = a1;
            out[2] = a2;
            out[3] = a3;
            out[4] = a0 * v0 + a2 * v1 + a4;
            out[5] = a1 * v0 + a3 * v1 + a5;
            return out;
        }

        /**
         * Creates a matrix from a given angle
         * This is equivalent to (but much faster than):
         *
         *     Matrix2d.identity(dest);
         *     Matrix2d.rotate(dest, dest, rad);
         *
         * @param {Matrix2d} out Matrix2d receiving operation result
         * @param {Number} rad the angle to rotate the matrix by
         * @returns {Matrix2d} out
         */
        public static fromRotation(out: Matrix2d, rad: number): Matrix2d {
            var s = Math.sin(rad), c = Math.cos(rad);
            out[0] = c;
            out[1] = s;
            out[2] = -s;
            out[3] = c;
            out[4] = 0;
            out[5] = 0;
            return out;
        }

        /**
         * Creates a matrix from a vector scaling
         * This is equivalent to (but much faster than):
         *
         *     Matrix2d.identity(dest);
         *     Matrix2d.scale(dest, dest, vec);
         *
         * @param {Matrix2d} out Matrix2d receiving operation result
         * @param {Vector2} v Scaling vector
         * @returns {Matrix2d} out
         */
        public static fromScaling(out: Matrix2d, v: Vector2): Matrix2d {
            out[0] = v[0];
            out[1] = 0;
            out[2] = 0;
            out[3] = v[1];
            out[4] = 0;
            out[5] = 0;
            return out;
        }

        /**
         * Creates a matrix from a vector translation
         * This is equivalent to (but much faster than):
         *
         *     Matrix2d.identity(dest);
         *     Matrix2d.translate(dest, dest, vec);
         *
         * @param {Matrix2d} out Matrix2d receiving operation result
         * @param {Vector2} v Translation vector
         * @returns {Matrix2d} out
         */
        public static fromTranslation(out: Matrix2d, v: Vector2): Matrix2d {
            out[0] = 1;
            out[1] = 0;
            out[2] = 0;
            out[3] = 1;
            out[4] = v[0];
            out[5] = v[1];
            return out;
        }

        /**
         * Returns a string representation of a Matrix2d
         *
         * @param {Matrix2d} a matrix to represent as a string
         * @returns {String} string representation of the matrix
         */
        public static toString(a:Matrix2d) {
            return 'Matrix2d(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' +
                a[3] + ', ' + a[4] + ', ' + a[5] + ')';
        }

        /**
         * Returns Frobenius norm of a Matrix2d
         *
         * @param {Matrix2d} a the matrix to calculate Frobenius norm of
         * @returns {Number} Frobenius norm
         */
        public static frob(a: Matrix2d): number {
            return (Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + 1))
        }

        /**
         * Adds two Matrix2d's
         *
         * @param {Matrix2d} out the receiving matrix
         * @param {Matrix2d} a the first operand
         * @param {Matrix2d} b the second operand
         * @returns {Matrix2d} out
         */
        public static add(out: Matrix2d, a: Matrix2d, b: Matrix2d): Matrix2d {
            out[0] = a[0] + b[0];
            out[1] = a[1] + b[1];
            out[2] = a[2] + b[2];
            out[3] = a[3] + b[3];
            out[4] = a[4] + b[4];
            out[5] = a[5] + b[5];
            return out;
        }

        /**
         * Subtracts matrix b from matrix a
         *
         * @param {Matrix2d} out the receiving matrix
         * @param {Matrix2d} a the first operand
         * @param {Matrix2d} b the second operand
         * @returns {Matrix2d} out
         */
        public static sub(out: Matrix2d, a: Matrix2d, b: Matrix2d): Matrix2d {
            out[0] = a[0] - b[0];
            out[1] = a[1] - b[1];
            out[2] = a[2] - b[2];
            out[3] = a[3] - b[3];
            out[4] = a[4] - b[4];
            out[5] = a[5] - b[5];
            return out;
        }

        /**
         * Multiply each element of the matrix by a scalar.
         *
         * @param {Matrix2d} out the receiving matrix
         * @param {Matrix2d} a the matrix to scale
         * @param {Number} b amount to scale the matrix's elements by
         * @returns {Matrix2d} out
         */
        public static multiplyScalar(out: Matrix2d, a: Matrix2d, b: number): Matrix2d {
            out[0] = a[0] * b;
            out[1] = a[1] * b;
            out[2] = a[2] * b;
            out[3] = a[3] * b;
            out[4] = a[4] * b;
            out[5] = a[5] * b;
            return out;
        }

        /**
         * Adds two Matrix2d's after multiplying each element of the second operand by a scalar value.
         *
         * @param {Matrix2d} out the receiving vector
         * @param {Matrix2d} a the first operand
         * @param {Matrix2d} b the second operand
         * @param {Number} scale the amount to scale b's elements by before adding
         * @returns {Matrix2d} out
         */
        public static multiplyScalarAndAdd(out: Matrix2d, a: Matrix2d, b: Matrix2d, scale: number): Matrix2d {
            out[0] = a[0] + (b[0] * scale);
            out[1] = a[1] + (b[1] * scale);
            out[2] = a[2] + (b[2] * scale);
            out[3] = a[3] + (b[3] * scale);
            out[4] = a[4] + (b[4] * scale);
            out[5] = a[5] + (b[5] * scale);
            return out;
        }

        /**
         * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
         *
         * @param {Matrix2d} a The first matrix.
         * @param {Matrix2d} b The second matrix.
         * @returns {Boolean} True if the matrices are equal, false otherwise.
         */
        public static exactEquals(a: Matrix2d, b: Matrix2d): boolean {
            return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5];
        }

        /**
         * Returns whether or not the matrices have approximately the same elements in the same position.
         *
         * @param {Matrix2d} a The first matrix.
         * @param {Matrix2d} b The second matrix.
         * @returns {Boolean} True if the matrices are equal, false otherwise.
         */
        public static equals(a: Matrix2d, b: Matrix2d): boolean {
            var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5];
            var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5];
            return (Math.abs(a0 - b0) <= SMath.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
                Math.abs(a1 - b1) <= SMath.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
                Math.abs(a2 - b2) <= SMath.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
                Math.abs(a3 - b3) <= SMath.EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3)) &&
                Math.abs(a4 - b4) <= SMath.EPSILON * Math.max(1.0, Math.abs(a4), Math.abs(b4)) &&
                Math.abs(a5 - b5) <= SMath.EPSILON * Math.max(1.0, Math.abs(a5), Math.abs(b5)));
        }
    }
}